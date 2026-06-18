const sendEmail = require('../../utils/sendEmail');

const formatUsd = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatClp = (value) =>
  Number(value || 0).toLocaleString('es-CL', {
    maximumFractionDigits: 0,
  });

const formatNumber = (value) =>
  Number(value || 0).toLocaleString('es-CL', {
    maximumFractionDigits: 2,
  });

const buildItemsRows = (items) =>
  items.map((item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.project_name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.credits_count}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatNumber(item.compensated_tons)} ton</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${formatUsd(item.price_per_credit_usd)} USD</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 700;">$${formatUsd(item.subtotal_usd)} USD</td>
    </tr>
  `).join('');

const sendPaymentReceiptEmail = async (payment) => {
  const paymentData = payment.toJSON ? payment.toJSON() : payment;
  const items = paymentData.items || [];

  const html = `
    <div style="margin: 0; padding: 0; background: #f6f8f8; font-family: Arial, sans-serif; color: #1f2937;">
      <div style="max-width: 720px; margin: 0 auto; padding: 32px 16px;">
        <div style="background: #ffffff; border-radius: 12px; padding: 28px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 8px; color: #5a8d94; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.8px;">
            Destinos Turísticos
          </p>
          <h1 style="margin: 0; font-size: 26px; line-height: 1.2; color: #111827;">
            Gracias por tu compra
          </h1>
          <p style="margin: 16px 0 0; font-size: 15px; line-height: 1.6; color: #4b5563;">
            Hola ${paymentData.buyer_name}, tu compensación fue registrada correctamente. A continuación encontrarás el detalle de los bonos adquiridos.
          </p>

          <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 10px;">
            <p style="margin: 0; font-size: 14px; color: #374151;"><strong>Orden:</strong> ${paymentData.buy_order}</p>
            <p style="margin: 8px 0 0; font-size: 14px; color: #374151;"><strong>Código de autorización:</strong> ${paymentData.authorization_code || 'N/A'}</p>
          </div>

          <table style="width: 100%; margin-top: 24px; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: #eef5f5; color: #374151;">
                <th style="padding: 12px; text-align: left;">Proyecto</th>
                <th style="padding: 12px; text-align: center;">Bonos</th>
                <th style="padding: 12px; text-align: right;">Toneladas</th>
                <th style="padding: 12px; text-align: right;">Precio</th>
                <th style="padding: 12px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${buildItemsRows(items)}
            </tbody>
          </table>

          <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 16px; color: #111827;">
              <strong>Total:</strong> $${formatUsd(paymentData.amount_usd)} USD
            </p>
            <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">
              Equivalente aproximado cobrado: $${formatClp(paymentData.amount_clp)} CLP. Tipo de cambio usado: ${formatClp(paymentData.exchange_rate)} CLP/USD.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    to: paymentData.buyer_email,
    subject: `Detalle de tu compra ${paymentData.buy_order}`,
    html,
  });
};

module.exports = {
  sendPaymentReceiptEmail,
};
