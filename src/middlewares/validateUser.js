import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const validateUser = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }

  if (!token || !validator.isJWT(token)) {
    const error = new ApiError(
      "Invalid JWT Token. Please login again",
      null,
      401
    );
    return next(error);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);
  if (!user) {
    const error = new ApiError("User not found", null, 404);
    return next(error);
  }

  const isPasswordChanged = user.isPasswordChanged(decodedToken.iat);
  if (isPasswordChanged) {
    const error = new ApiError(
      "User details changed. Please login again",
      null,
      401
    );
    return next(error);
  }

  next();
});

export { validateUser };
