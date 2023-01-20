function sendResponse(res, status, data, isError = false) {
  const response = {
    meta: {
      ...status,
      isError,
    },
    data: {
      ...data,
    },
  };

  return res.send(response);
}

module.exports = {
  sendResponse,
};
