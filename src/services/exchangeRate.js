const { Op } = require('sequelize');
const { ExchangeRate } = require('../models');

const CACHE_TTL_HOURS = 3;
const USD_TO_CLP_SOURCE = 'mindicador.cl';
const USD_TO_CLP_ENDPOINT = 'https://mindicador.cl/api/dolar';

const getCacheThreshold = () => {
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - CACHE_TTL_HOURS);
  return threshold;
};

const normalizeRateRecord = (record, isFallback = false) => ({
  rate: Number(record.rate),
  source: record.source,
  source_date: record.source_date,
  is_fallback: isFallback,
});

const findLatestStoredRate = () =>
  ExchangeRate.findOne({
    where: {
      currency_from: 'USD',
      currency_to: 'CLP',
    },
    order: [['created_at', 'DESC']],
  });

const findFreshStoredRate = () =>
  ExchangeRate.findOne({
    where: {
      currency_from: 'USD',
      currency_to: 'CLP',
      created_at: { [Op.gte]: getCacheThreshold() },
    },
    order: [['created_at', 'DESC']],
  });

const fetchMindicadorUsdRate = async () => {
  const response = await fetch(USD_TO_CLP_ENDPOINT, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`mindicador.cl responded with ${response.status}`);
  }

  const data = await response.json();
  const latestSerie = Array.isArray(data.serie) ? data.serie[0] : null;
  const rate = Number(latestSerie?.valor);

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error('mindicador.cl did not return a valid USD rate');
  }

  return {
    rate,
    source: USD_TO_CLP_SOURCE,
    source_date: latestSerie?.fecha ? new Date(latestSerie.fecha) : null,
  };
};

const getUsdToClpRate = async () => {
  const freshStoredRate = await findFreshStoredRate();

  if (freshStoredRate) {
    return normalizeRateRecord(freshStoredRate);
  }

  try {
    const externalRate = await fetchMindicadorUsdRate();
    const storedRate = await ExchangeRate.create({
      currency_from: 'USD',
      currency_to: 'CLP',
      rate: externalRate.rate,
      source: externalRate.source,
      source_date: externalRate.source_date,
    });

    return normalizeRateRecord(storedRate);
  } catch (error) {
    console.error('USD to CLP rate could not be refreshed:', error.message);

    const latestStoredRate = await findLatestStoredRate();

    if (latestStoredRate) {
      return normalizeRateRecord(latestStoredRate, true);
    }

    throw new Error('No se pudo obtener el tipo de cambio. Intenta nuevamente en unos minutos.');
  }
};

module.exports = {
  getUsdToClpRate,
};
