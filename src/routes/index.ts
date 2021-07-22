import { NextFunction, Request, Response, Router } from "express";
import user from "./user";
import banner from "./banner";
import category from "./category";
import product from "./product";
import auth from "./auth";
import admin from "./admin";
import smscode from "./smsCode";
import screw from "./screw";
import tUser from "./tuser";
import tDailyA from "./tDailyA";
import tDailyB from "./tDailyB";

const routes = Router();

routes.use("/user", user);
routes.use("/banner", banner);
routes.use("/category", category);
routes.use("/product", product);
routes.use("/auth", auth);
routes.use("/admin", admin);
routes.use("/smscode", smscode);
routes.use("/screw", screw);

routes.use("/tuser", tUser);
routes.use("/tDailyA", tDailyA);
routes.use("/tDailyB", tDailyB);

export default routes;