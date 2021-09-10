import { Router } from "express";
import commonController from "../controllers/commonController";

const router = Router();

router.route("/getModuleList").get(commonController.getModuleList);
router.route("/getDeviceType").get(commonController.getDeviceType);
router.route("/getTaskType").get(commonController.getTaskType);
router.route("/getSeverityList").get(commonController.getSeverityList);
router.route("/getDistributionList").get(commonController.getDistributionList);

export default router
