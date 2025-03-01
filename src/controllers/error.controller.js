import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import fs from "fs";

// SENDING ERROR RESPONSE
const prodErr = (error, res) => {
  return res.status(error.statusCode).json({
    status: error.status,
    status_code: error.statusCode,
    message: error.message,
    data: error.data,
  });
};

// ERROR FORMATTER FOR UNKNOWN ERRORS
const formatErr = (error, res) => {
  // CHECKING NODE ENV [PRODUCTION/DEVELOPMENT]
  if (process.env.NODE_ENV === "production") {
    // MONGOOSE INVALID INPUT ERROR
    if (error.name === "CastError") {
      const msg = `Invalid input for ${error.path}: ${error.value}`;
      return new ApiError(msg, null, 400);
    }

    // MONGOOSE DUPLICATE ERROR
    if (error.code == 11000) {
      const msg = `${Object.keys(error.keyValue)}: ${Object.values(
        error.keyValue
      )} already exist!`;

      return new ApiError(msg, null, 409);
    }
  }

  // MONGOOSE VALIDATION ERROR
  if (error.name === "ValidationError") {
    const msg = `${Object.keys(
      error.errors
    )} does't meet the required parameters`;

    return new ApiError(msg, null, 400);
  }

  // MULTER ERRORS
  if (error instanceof multer.MulterError) {
    const msg = error.message;
    console.log("hello");

    return new ApiError(msg, null, 400);
  }

  // GENERIC ERROR RESPONSE
  return res.status(error.statusCode).json({
    status: error.status,
    status_code: error.statusCode,
    message: "Something went wrong. Please try again later",
    data: error.data,
  });
};

// GLOBAL ERROR HANDLER
const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.data = error.data || null;

  if (req.body) {
    if (fs.existsSync(req.body.thumbnail)) {
      fs.unlinkSync(req.body.thumbnail);
    }
    if (fs.existsSync(req.body.trailer)) {
      fs.unlinkSync(req.body.trailer);
    }
  }

  if (!error.isOperational) {
    error = formatErr(error, res);
  }

  prodErr(error, res);
};

export { errorHandler };
