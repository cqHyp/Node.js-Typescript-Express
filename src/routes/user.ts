import { Router } from "express";
import UserController from "../controllers/userController"

const router = Router();

router.route("/getUserList").get(UserController.listAll);

router.route("/getUserById").get(UserController.getOneById);

router.route("/createUser").post(UserController.newUser);

router.route("/updateUser").post(UserController.editUser);

router.route("/deleteUser").post(UserController.delUser);

export default router