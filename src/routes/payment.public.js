const crypto = require('crypto');
const express = require('express');

const router = express.Router();
const { sequelize, Project, Transaction, Payment, PaymentItem } = require('../models');
const { getUsdToClpRate } = require('../services/exchangeRate');
const { getFrontendUrl, getPaymentProvider } = require('../services/payments/providerFactory');
const { sendPaymentReceiptEmail } = require('../services/payments/paymentReceiptEmail');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roundUsd = (value) => Math.round(value * 100) / 100;
const roundTons = (value) => Math.round(value * 10000) / 10000;

const isProjectPurchasable = (project) =>
  Boolean(project?.is_open_for_purchase) &&
  Number(project?.credit_price) > 0 &&
  Number(project?.tons_per_credit) > 0 &&
  Number(project?.total_credits) > 0;

const createBuyOrder = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `GT${timestamp}${random}`.slice(0, 26);
};

const createSessionId = () => crypto.randomUUID();

const getApprovedPaymentCredits = async (projectId) => {
  const approvedItems = await PaymentItem.findAll({
    attributes: ['credits_count'],
    where: { project_id: projectId },
    include: [
      {
        model: Payment,
        as: 'payment',
        attributes: [],
        where: { status: 'APPROVED' },
        required: true,
      },
    ],
  });

  return approvedItems.reduce((total, item) => total + Number(item.credits_count || 0), 0);
};

const getUsedCredits = async (projectId) => {
  const transactionCredits = await Transaction.sum('credits_count', {
    where: { project_id: projectId },
  });
  const approvedPaymentCredits = await getApprovedPaymentCredits(projectId);

  return Number(transactionCredits || 0) + approvedPaymentCredits;
};

const parseCheckoutPayload = (body) => {
  const buyerName = String(body.buyer_name || '').trim();
  const buyerEmail = String(body.buyer_email || '').trim().toLowerCase();
  const rawItems = Array.isArray(body.items) ? body.items : [];

  if (buyerName.length < 3) {
    throw new Error('El nombre es obligatorio');
  }

  if (!EMAIL_REGEX.test(buyerEmail)) {
    throw new Error('El correo no es válido');
  }

  if (rawItems.length === 0) {
    throw new Error('El carro está vacío');
  }

  const items = rawItems.map((item) => {
    const projectId = Number(item.project_id);
    const creditsCount = Number(item.credits_count);

    if (!Number.isInteger(projectId) || projectId <= 0) {
      throw new Error('Uno de los proyectos no es válido');
    }

    if (!Number.isInteger(creditsCount) || creditsCount <= 0) {
      throw new Error('La cantidad de bonos debe ser mayor a cero');
    }

    return {
      project_id: projectId,
      credits_count: creditsCount,
    };
  });

  return { buyerName, buyerEmail, items };
};

router.post('/create', async (req, res) => {
  const dbTransaction = await sequelize.transaction();

  try {
    const { buyerName, buyerEmail, items } = parseCheckoutPayload(req.body);
    const exchangeRate = await getUsdToClpRate();
    const buyOrder = createBuyOrder();
    const sessionId = createSessionId();
    const frontendUrl = getFrontendUrl(req);
    const returnUrl = `${frontendUrl}/payment/return`;

    const paymentItems = [];
    let amountUsd = 0;

    for (const item of items) {
      const project = await Project.findByPk(item.project_id, { transaction: dbTransaction });

      if (!project || !isProjectPurchasable(project)) {
        throw new Error('Uno de los proyectos no está disponible para compra');
      }

      const usedCredits = await getUsedCredits(project.id);
      const availableCredits = Number(project.total_credits) - usedCredits;

      if (item.credits_count > availableCredits) {
        throw new Error(`No hay suficientes bonos disponibles para ${project.name}`);
      }

      const pricePerCreditUsd = Number(project.credit_price);
      const tonsPerCredit = Number(project.tons_per_credit);
      const subtotalUsd = roundUsd(pricePerCreditUsd * item.credits_count);
      const compensatedTons = roundTons(tonsPerCredit * item.credits_count);

      amountUsd += subtotalUsd;
      paymentItems.push({
        project_id: project.id,
        project_name: project.name,
        credits_count: item.credits_count,
        tons_per_credit: tonsPerCredit,
        price_per_credit_usd: pricePerCreditUsd,
        subtotal_usd: subtotalUsd,
        compensated_tons: compensatedTons,
      });
    }

    amountUsd = roundUsd(amountUsd);
    const amountClp = Math.max(1, Math.round(amountUsd * exchangeRate.rate));

    const provider = getPaymentProvider(req);
    const transactionResponse = await provider.createTransaction(
      buyOrder,
      sessionId,
      amountClp,
      returnUrl,
    );

    const payment = await Payment.create({
      buy_order: buyOrder,
      session_id: sessionId,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      amount_usd: amountUsd,
      amount_clp: amountClp,
      exchange_rate: exchangeRate.rate,
      exchange_rate_source: exchangeRate.source,
      exchange_rate_date: exchangeRate.source_date,
      status: 'PENDING',
      token: transactionResponse.token,
      provider: process.env.PAYMENT_PROVIDER || 'mock',
      response_json: {
        create: transactionResponse,
      },
    }, { transaction: dbTransaction });

    await PaymentItem.bulkCreate(
      paymentItems.map((item) => ({
        ...item,
        payment_id: payment.id,
      })),
      { transaction: dbTransaction },
    );

    await dbTransaction.commit();

    res.status(201).json({
      payment_id: payment.id,
      buy_order: buyOrder,
      token: transactionResponse.token,
      url: transactionResponse.url,
      amount_usd: amountUsd,
      amount_clp: amountClp,
      exchange_rate: exchangeRate.rate,
      exchange_rate_source: exchangeRate.source,
      exchange_rate_date: exchangeRate.source_date,
      exchange_rate_is_fallback: exchangeRate.is_fallback,
      return_url: returnUrl,
    });
  } catch (error) {
    await dbTransaction.rollback();
    console.error(error);
    res.status(400).json({ error: error.message || 'No se pudo crear el pago' });
  }
});

router.get('/exchange-rate', async (_req, res) => {
  try {
    const exchangeRate = await getUsdToClpRate();

    res.json({
      currency_from: 'USD',
      currency_to: 'CLP',
      rate: exchangeRate.rate,
      source: exchangeRate.source,
      source_date: exchangeRate.source_date,
      is_fallback: exchangeRate.is_fallback,
    });
  } catch (error) {
    console.error(error);
    res.status(503).json({ error: error.message || 'No se pudo obtener el tipo de cambio' });
  }
});

router.post('/commit', async (req, res) => {
  try {
    const token = String(req.body.token_ws || req.body.token || '').trim();
    const mockStatus = req.body.status === 'rejected' ? 'rejected' : undefined;

    if (!token) {
      return res.status(400).json({ error: 'Token requerido' });
    }

    const payment = await Payment.findOne({
      where: { token },
      include: [{ model: PaymentItem, as: 'items' }],
    });

    if (!payment) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    if (payment.status === 'APPROVED' || payment.status === 'REJECTED') {
      return res.json(payment);
    }

    const provider = getPaymentProvider(req);
    const commitResponse = await provider.commitTransaction(token, { status: mockStatus });
    const nextStatus = commitResponse.approved ? 'APPROVED' : 'REJECTED';

    await payment.update({
      status: nextStatus,
      authorization_code: commitResponse.authorizationCode || null,
      payment_type: commitResponse.paymentType || null,
      response_json: {
        ...(payment.response_json || {}),
        commit: commitResponse.response,
      },
    });

    const updatedPayment = await Payment.findByPk(payment.id, {
      include: [{ model: PaymentItem, as: 'items' }],
    });

    if (nextStatus === 'APPROVED') {
      try {
        await sendPaymentReceiptEmail(updatedPayment);
      } catch (emailError) {
        console.error('Receipt email could not be sent:', emailError.message);
      }
    }

    res.json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo confirmar el pago' });
  }
});

module.exports = router;
