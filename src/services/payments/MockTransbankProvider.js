const crypto = require('crypto');

class MockTransbankProvider {
  constructor({ frontendUrl }) {
    this.frontendUrl = frontendUrl;
  }

  async createTransaction(_buyOrder, _sessionId, _amount, _returnUrl) {
    const token = `mock-${crypto.randomUUID()}`;

    return {
      token,
      url: `${this.frontendUrl}/mock-webpay?token_ws=${encodeURIComponent(token)}`,
    };
  }

  async commitTransaction(token, options = {}) {
    const rejected = options.status === 'rejected';

    return {
      approved: !rejected,
      authorizationCode: rejected ? null : '123456',
      paymentType: 'MOCK',
      response: {
        token,
        status: rejected ? 'REJECTED' : 'APPROVED',
        authorization_code: rejected ? null : '123456',
        payment_type_code: 'MOCK',
      },
    };
  }
}

module.exports = MockTransbankProvider;
