import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();

router.route("/signup").post(AuthController.signup);

router.route("/signin").post(AuthController.signin);

export default router