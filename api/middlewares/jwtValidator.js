const jwt = require('jsonwebtoken');

const encryptToken = (payload) => {
  return jwt.sign(payload, 'naturegoodsmantap', { expiresIn: '2 days' });
};

const decryptToken = (req, res, next) => {
  return jwt.verify(req.token, 'naturegoodsmantap', (err, decoded) => {
    if (err)
      return res.status(400).send({
        status: 'Unauthorized',
        message: 'expired',
      });
    req.user = decoded;
    next();
  });
};

module.exports = { encryptToken, decryptToken };
