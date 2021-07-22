"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const screwController_1 = require("../controllers/screwController");
const router = express_1.Router();
router.route("/getScrewList").get(screwController_1.default.getScrewList);
router.route("/getScrewById").get(screwController_1.default.getScrewById);
router.route("/createScrew").post(screwController_1.default.createScrew);
router.route("/updateScrew").post(screwController_1.default.updateScrew);
router.route("/deleteScrew").post(screwController_1.default.deleteScrew);
exports.default = router;
