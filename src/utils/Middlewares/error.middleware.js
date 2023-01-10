function errorMiddleware(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong!';

  res.status(status).send({
    status: status,
    message: message,
  });
}

export default errorMiddleware;
