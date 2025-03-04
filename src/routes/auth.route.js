import { Router } from "express";

const router = Router();

// CONTROLLERS
import { userSignup, userLogin } from "../controllers/auth.controller.js";
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

export default router;
