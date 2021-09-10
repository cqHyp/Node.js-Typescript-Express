import { Router } from "express";
import titerationController from "../controllers/titerationController";

const router = Router();

router.route("/getIterationList").get(titerationController.listAll);

export default router
