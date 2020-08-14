import { Router } from "express";
import AdminController from "../controllers/adminController";

const router = Router();

router.route("/login").post(AdminController.adminLogin);

router.route("/loginBySMS").post(AdminController.adminLoginBySMS);

router.route("/register").post(AdminController.adminRegister);

router.route("/getUserInfo").get(AdminController.getAdminUserInfo);

export default router