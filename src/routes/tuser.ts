import { Router } from "express";
import tUserController from "../controllers/tuserController"

const router = Router();

router.route("/getUserList").get(tUserController.listAll);

router.route("/getUserById").get(tUserController.getOneById);

router.route("/createUser").post(tUserController.createUser);

router.route("/updateUser").post(tUserController.updateUser);

router.route("/deleteUser").post(tUserController.deleteUser);

export default router