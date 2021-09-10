import { Router } from "express";
import testReportController from "../controllers/testReportController";

const router = Router();

router.route("/getAllList").get(testReportController.listAll);
router.route("/createReport").post(testReportController.createReport);

export default router
