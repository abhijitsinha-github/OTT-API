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
import { fileHandler, isValidID } from "../middlewares/content.middleware.js";

router
  .route("/")
  .post(contentFile, fileHandler, createContent)
  .get(getAllContents);

router
  .route("/:id")
  .get(isValidID, getContent)
  .put(isValidID, contentFile, fileHandler, updateContent)
  .delete(deleteContent);

export default router;
