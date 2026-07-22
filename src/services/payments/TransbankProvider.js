const {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} = require('transbank-sdk');

const normalizePayload = (payload) => JSON.parse(JSON.stringify(payload || {}));

const resolveEnvironment = () => {
  const environment = String(process.env.TRANSBANK_ENVIRONMENT || 'integration').toLowerCase();

  if (environment === 'production') {
    return {
      environmentName: 'production',
      sdkEnvironment: Environment.Production,
    };
  }

  return {
    environmentName: 'integration',
    sdkEnvironment: Environment.Integration,
  };
};

const resolveCredentials = (environmentName) => {
  const configuredCommerceCode = process.env.TRANSBANK_COMMERCE_CODE;
  const configuredApiKey = process.env.TRANSBANK_API_KEY;

  if (configuredCommerceCode && configuredApiKey) {
    return {
      commerceCode: configuredCommerceCode,
      apiKey: configuredApiKey,
    };
  }

  if (environmentName === 'integration') {
    return {
      commerceCode: IntegrationCommerceCodes.WEBPAY_PLUS,
      apiKey: IntegrationApiKeys.WEBPAY,
    };
  }

  throw new Error('Transbank production credentials are required');
};

class TransbankProvider {
  constructor() {
    const { environmentName, sdkEnvironment } = resolveEnvironment();
    const { commerceCode, apiKey } = resolveCredentials(environmentName);

    this.environmentName = environmentName;
    this.transaction = new WebpayPlus.Transaction(
      new Options(commerceCode, apiKey, sdkEnvironment),
    );
  }

  async createTransaction(buyOrder, sessionId, amount, returnUrl) {
    const response = await this.transaction.create(buyOrder, sessionId, amount, returnUrl);

    return {
      token: response.token,
      url: response.url,
      environment: this.environmentName,
      response: normalizePayload(response),
    };
  }

  async commitTransaction(token) {
    const response = await this.transaction.commit(token);
    const approved = Number(response.response_code) === 0 && response.status === 'AUTHORIZED';

    return {
      approved,
      authorizationCode: response.authorization_code || null,
      paymentType: response.payment_type_code || null,
      response: normalizePayload(response),
    };
  }
}

module.exports = TransbankProvider;
