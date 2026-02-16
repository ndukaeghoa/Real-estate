// Wrap async route handlers to forward errors to global middleware.
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Global API error middleware.
export const errorHandler = (err, _req, res, _next) => {
  console.error('API error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};
