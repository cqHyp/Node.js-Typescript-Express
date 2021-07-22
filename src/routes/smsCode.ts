import { Router } from "express";
import SMSCodeController from "../controllers/smsCodeController";

const router = Router();

router.route("/sendSMSCode").post(SMSCodeController.sendSMSCode);
router.route("/getSMSCode").post(SMSCodeController.getSMSCode);

export default router