"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = express_1.Router();
router.route("/signup").post(authController_1.default.signup);
router.route("/signin").post(authController_1.default.signin);
exports.default = router;
