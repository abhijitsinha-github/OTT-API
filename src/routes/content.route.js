import { Router } from "express";

const router = Router();

// CONTROLLERS
import {
  createContent,
  getAllContents,
  getContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

// MIDDLEWARES
import { contentFile } from "../middlewares/multer.middleware.js";
import { isValidID } from "../middlewares/content.middleware.js";
import { validateUser } from "../middlewares/validateUser.js";

router
  .route("/")
  .post(validateUser, contentFile, createContent)
  .get(validateUser, getAllContents);

router
  .route("/:id")
  .get(validateUser, isValidID, getContent)
  .put(validateUser, isValidID, contentFile, updateContent)
  .delete(deleteContent);

export default router;
