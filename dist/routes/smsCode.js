"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const smsCodeController_1 = require("../controllers/smsCodeController");
const router = express_1.Router();
router.route("/sendSMSCode").post(smsCodeController_1.default.sendSMSCode);
router.route("/getSMSCode").post(smsCodeController_1.default.getSMSCode);
exports.default = router;
