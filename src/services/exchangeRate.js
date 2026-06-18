const DEFAULT_USD_TO_CLP_RATE = 950;

const getUsdToClpRate = () => {
  const configuredRate = Number(process.env.USD_TO_CLP_RATE);

  if (Number.isFinite(configuredRate) && configuredRate > 0) {
    return configuredRate;
  }

  return DEFAULT_USD_TO_CLP_RATE;
};

module.exports = {
  getUsdToClpRate,
};
