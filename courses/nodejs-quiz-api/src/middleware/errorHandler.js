function errorHandler(err, req, res, next) {
  console.error('에러 발생:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : '서버 내부 오류가 발생했습니다';

  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
