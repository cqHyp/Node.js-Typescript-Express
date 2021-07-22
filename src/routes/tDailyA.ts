import { Router } from "express";
import tdailyaController from "../controllers/tdailyaController"

const router = Router();

router.route("/getDailyAList").get(tdailyaController.listAll);

router.route("/getDailyAById").get(tdailyaController.getOneById);

router.route("/createDailyA").post(tdailyaController.createDailyA);

router.route("/updateDailyA").post(tdailyaController.updateDailyA);

router.route("/deleteDailyA").post(tdailyaController.deleteDailyA);

export default router
