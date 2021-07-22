import { Router } from "express";
import ScrewController from "../controllers/screwController"

const router = Router();

router.route("/getScrewList").get(ScrewController.getScrewList);

router.route("/getScrewById").get(ScrewController.getScrewById);

router.route("/createScrew").post(ScrewController.createScrew);

router.route("/updateScrew").post(ScrewController.updateScrew);

router.route("/deleteScrew").post(ScrewController.deleteScrew);

export default router