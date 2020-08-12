"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = express_1.Router();
router.route("/login").post(adminController_1.default.adminLogin);
exports.default = router;
