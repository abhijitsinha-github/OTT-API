import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse, sendRes } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import validator from "validator";

const generateJWTtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//  SignUp or Register User
const userSignup = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = generateJWTtoken(newUser._id);

  const response = new ApiResponse(
    "User igned up successfully",
    { token },
    201
  );
  sendRes(response, res);
});

// Login already existing User
const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if ((!email && validator.isEmail(email)) || !password) {
    const error = new ApiError("Please enter email and password", null, 400);
    next(error);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.comparePassword(password, user.password)) {
    const error = new ApiError("Invalid email or password", null, 401);
    next(error);
  }

  const token = generateJWTtoken(user._id);

  const response = new ApiResponse(
    "User logged in successfully",
    { token },
    200
  );
  sendRes(response, res);
});

export { userSignup, userLogin };
