import { Router } from "express";
import bannerController from "../controllers/bannerController"

const router = Router();

router.route("/getBannerList").get(bannerController.getBannerList);

router.route("/getBannerById").get(bannerController.getBannerById);

router.route("/createBanner").post(bannerController.createBanner);

router.route("/updateBanner").post(bannerController.updateBanner);

router.route("/deleteBanner").post(bannerController.deleteBanner);

export default router