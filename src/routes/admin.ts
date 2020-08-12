import { Router } from "express";
import AdminController from "../controllers/adminController";

const router = Router();

router.route("/login").post(AdminController.adminLogin);

export default router