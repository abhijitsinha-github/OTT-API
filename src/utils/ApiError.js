// CLASS TO SET ERRORS
class ApiError extends Error {
  constructor(message, data, statusCode) {
    super(message);
    this.data = data;
    this.statusCode = statusCode;

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
