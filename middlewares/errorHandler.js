// This middleware will catch any thrown errors and return a clean JSON response.
export const errorHandler = (err, req, res, next) => {
  console.log("Error:", err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
