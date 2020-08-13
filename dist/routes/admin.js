"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = express_1.Router();
router.route("/login").post(adminController_1.default.adminLogin);
router.route("/loginBySMS").post(adminController_1.default.adminLoginBySMS);
router.route("/register").post(adminController_1.default.adminRegister);
exports.default = router;
