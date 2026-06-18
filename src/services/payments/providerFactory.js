const MockTransbankProvider = require('./MockTransbankProvider');

const getFrontendUrl = (req) => {
  const origin = req.get('origin');
  if (origin) return origin.replace(/\/$/, '');

  const configuredUrl = process.env.FRONTEND_URL || process.env.PUBLIC_FRONTEND_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, '');

  return 'http://localhost:3002';
};

const getPaymentProvider = (req) => {
  const providerName = process.env.PAYMENT_PROVIDER || 'mock';
  const frontendUrl = getFrontendUrl(req);

  if (providerName !== 'mock') {
    throw new Error(`Payment provider "${providerName}" is not available yet`);
  }

  return new MockTransbankProvider({ frontendUrl });
};

module.exports = {
  getFrontendUrl,
  getPaymentProvider,
};
