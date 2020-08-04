import { NextFunction, Request, Response, Router } from "express";
import user from "./user";
import auth from "./auth";
import banner from "./banner";
import category from "./category";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/banner", banner);
routes.use("/category", category);

export default routes;