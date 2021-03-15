const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { statusCode, message } = err;
  return res.status(statusCode || 500).send({
    status: 'ERROR',
    message: message || err[0].msg,
  });
  // res.status(500).send(err);
};

module.exports = errorHandler;
