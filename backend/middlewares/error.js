class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Json Web Token is invalid, try again!", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Json Web Token has expired, try again!", 400);
  }

  // Handle Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Mongoose validation errors
  const errorMessage = err.errors
    ? Object.values(err.errors)[0].message   // pick first error message
    : err.message;


  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
