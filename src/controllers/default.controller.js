import { ApiError } from "../utils/ApiError.js";

// UNKNOWN ROUTE HANDLER
const defaultController = (req, res, next) => {
  const error = new ApiError(
    `Can't find ${req.originalUrl} on the server`,
    null,
    404
  );

  next(error);
};

export { defaultController };
