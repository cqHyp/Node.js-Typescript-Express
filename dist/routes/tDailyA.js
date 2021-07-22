"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tdailyaController_1 = require("../controllers/tdailyaController");
const router = express_1.Router();
router.route("/getDailyAList").get(tdailyaController_1.default.listAll);
router.route("/getDailyAById").get(tdailyaController_1.default.getOneById);
router.route("/createDailyA").post(tdailyaController_1.default.createDailyA);
router.route("/updateDailyA").post(tdailyaController_1.default.updateDailyA);
router.route("/deleteDailyA").post(tdailyaController_1.default.deleteDailyA);
exports.default = router;