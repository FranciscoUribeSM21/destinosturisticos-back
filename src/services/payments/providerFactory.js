const MockTransbankProvider = require('./MockTransbankProvider');
const TransbankProvider = require('./TransbankProvider');

const getFrontendUrl = (req) => {
  const origin = req.get('origin');
  if (origin) return origin.replace(/\/$/, '');

  const configuredUrl = process.env.FRONTEND_URL || process.env.PUBLIC_FRONTEND_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, '');

  return 'http://localhost:3002';
};

const getPublicApiUrl = (req) => {
  const configuredUrl = process.env.PUBLIC_API_URL || process.env.API_PUBLIC_URL;
  if (configuredUrl) return configuredUrl.replace(/\/$/, '');

  const forwardedProtocol = req.get('x-forwarded-proto');
  const forwardedHost = req.get('x-forwarded-host');
  const protocol = forwardedProtocol || req.protocol || 'http';
  const host = forwardedHost || req.get('host');

  return `${protocol}://${host}`.replace(/\/$/, '');
};

const getPaymentProvider = (req) => {
  const providerName = String(process.env.PAYMENT_PROVIDER || 'mock').toLowerCase();
  const frontendUrl = getFrontendUrl(req);

  if (providerName === 'mock') {
    return new MockTransbankProvider({ frontendUrl });
  }

  if (providerName === 'transbank') {
    return new TransbankProvider();
  }

  throw new Error(`Payment provider "${providerName}" is not available`);
};

module.exports = {
  getFrontendUrl,
  getPublicApiUrl,
  getPaymentProvider,
};
