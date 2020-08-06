"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.route("/wxLogin").post(authController_1.default.wxLogin);
router.route("/wxInitUserInfo").post(authController_1.default.wxInitUserInfo);
exports.default = router;
