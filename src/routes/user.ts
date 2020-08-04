import { Router } from "express";
import UserController from "../controllers/userController"

const router = Router();

router.route("/getUserList").get(UserController.listAll);

router.route("/getUserById").get(UserController.getOneById);

router.route("/createUser").post(UserController.createUser);

router.route("/updateUser").post(UserController.updateUser);

router.route("/deleteUser").post(UserController.deleteUser);

export default router