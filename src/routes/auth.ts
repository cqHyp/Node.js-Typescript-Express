import { Router } from "express";
import AuthController from "../controllers/authController"

const router = Router();

router.route("/wxLogin").post(AuthController.wxLogin);
router.route("/wxInitUserInfo").post(AuthController.wxInitUserInfo);

export default router