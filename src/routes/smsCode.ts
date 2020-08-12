import { Router } from "express";
import SMSCodeController from "../controllers/smsCodeController";

const router = Router();

router.route("/sendSMSCode").post(SMSCodeController.sendSMSCode);

export default router