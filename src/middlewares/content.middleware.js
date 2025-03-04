import { Content } from "../models/content.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// CHECKING IF THE OBJECT ID EXIST OR NOT
const isValidID = asyncHandler(async (req, res, next) => {
  const content = await Content.findById(req.params.id);

  if (!content) {
    const error = new ApiError("Content with given ID not found", null, 404);
    return next(error);
  }

  req.content = content;

  next();
});

export { isValidID };
