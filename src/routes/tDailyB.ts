import { Router } from "express";
import tdailybController from "../controllers/tdailybController";

const router = Router();

router.route("/getDailyBList").get(tdailybController.listAll);

router.route("/getDailyBById").get(tdailybController.getOneById);

router.route("/createDailyB").post(tdailybController.createDailyB);

router.route("/updateDailyB").post(tdailybController.updateDailyB);

router.route("/deleteDailyB").post(tdailybController.deleteDailyB);

export default router
