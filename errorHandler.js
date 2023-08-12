const errorHandle = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "This is an error", err });
};

module.exports = errorHandle;

// the four parameters in errorhandling  middleware
