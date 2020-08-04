import { Router } from "express";
import categoryController from "../controllers/categoryController";

const router = Router();

router.route("/getCategoryList").get(categoryController.getCategoryList);

router.route("/getCategoryById").get(categoryController.getCategoryById);

router.route("/createCategory").post(categoryController.createCategory);

router.route("/updateCategory").post(categoryController.updateCategory);

router.route("/deleteCategory").post(categoryController.deleteCategory);

export default router