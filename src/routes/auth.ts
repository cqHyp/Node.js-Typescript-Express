import { Router } from "express";
import AuthController from "../controllers/authController"

const router = Router();

router.route("/wxLogin").get(AuthController.wxLogin);

export default router