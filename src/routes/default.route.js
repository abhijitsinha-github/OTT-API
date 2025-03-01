import { Router } from "express";
import { defaultController } from "../controllers/default.controller.js";

const router = Router();

router.route("*").all(defaultController);

export default router;
