import { Content } from "../models/content.model.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse, sendRes } from "../utils/ApiResponse.js";
import fs from "fs";

// TO SAVE DATA IN THE DATABASE
const createContent = asyncHandler(async (req, res, next) => {
  const content = await Content.create(req.body);

  const response = new ApiResponse(`Data Saved Successfully`, content, 201);
  sendRes(response, res);
});

// RETRIVE ALL DATA WITH FILTER, SORT & PAGINATION FEATURES
const getAllContents = asyncHandler(async (req, res, next) => {
  const { filter, sort, fields, limit, skip } = await ApiFeatures(req);

  const content = await Content.find(filter)
    .sort(sort)
    .select(fields)
    .limit(limit)
    .skip(skip);

  const response = new ApiResponse(`Data retrived successfully`, content, 200);

  sendRes(response, res);
});

// GET A SPECIFIC DATA BY ID
const getContent = asyncHandler(async (req, res, next) => {
  const response = new ApiResponse(
    `Data retrived successfully`,
    req.content,
    200
  );

  sendRes(response, res);
});

// UPDATE DATA IN DATABASE
const updateContent = asyncHandler(async (req, res, next) => {
  const newContent = await Content.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (req.files.thumbnail) {
    if (fs.existsSync(req.content.thumbnail)) {
      fs.unlinkSync(req.content.thumbnail);
    }
  }

  if (req.files.trailer) {
    if (fs.existsSync(req.content.trailer)) {
      fs.unlinkSync(req.content.trailer);
    }
  }

  const response = new ApiResponse(
    `Data updated successfully`,
    newContent,
    200
  );

  sendRes(response, res);
});

// DELETE DATA FROM DATABASE
const deleteContent = asyncHandler(async (req, res, next) => {
  const content = await Content.findByIdAndDelete(req.params.id);

  if (!content) {
    const error = new ApiError("Content with given ID not found", null, 404);
    return next(error);
  }

  if (content) {
    if (fs.existsSync(content.thumbnail)) {
      fs.unlinkSync(content.thumbnail);
    }
    if (fs.existsSync(content.trailer)) {
      fs.unlinkSync(content.trailer);
    }
  }

  const response = new ApiResponse(`Data deleted successfully`, content, 200);

  sendRes(response, res);
});

export {
  createContent,
  getAllContents,
  getContent,
  updateContent,
  deleteContent,
};
