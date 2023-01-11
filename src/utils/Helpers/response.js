export const successResponse = (res, status, message, data) => {
  const items = data;
  if (items.pagination) {
    const { data, ...pagination } = items;
    res.status(status).send({
      status: 'success',
      statusCode: status,
      message,
      data,
      ...pagination,
    });
  } else {
    res.status(status).send({
      status: 'success',
      statusCode: status,
      message,
      data,
    });
  }
};
