export const successResponse = (res, status, message, data) => {
  res.status(status).send({
    status: 'success',
    statusCode: status,
    message,
    data,
  });
};
