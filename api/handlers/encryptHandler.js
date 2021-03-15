const crypto = require('crypto');

const encryptHandler = (payload) =>
  crypto.createHmac('sha256', 'naturegoodsmantap').update(payload).digest('hex');

module.exports = encryptHandler;
