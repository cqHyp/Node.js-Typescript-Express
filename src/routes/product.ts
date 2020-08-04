import { Router } from "express";
import ProductController from "../controllers/productController"

const router = Router();

router.route("/getProductList").get(ProductController.getProductList);

router.route("/getProductById").get(ProductController.getProductById);

router.route("/createProduct").post(ProductController.createProduct);

router.route("/updateProduct").post(ProductController.updateProduct);

router.route("/deleteProduct").post(ProductController.deleteProduct);

export default router