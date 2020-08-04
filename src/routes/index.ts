import { NextFunction, Request, Response, Router } from "express";
import user from "./user";
import auth from "./auth";
import banner from "./banner";
import category from "./category";
import product from "./product";

const routes = Router();

routes.use("/user", user);
routes.use("/auth", auth);
routes.use("/banner", banner);
routes.use("/category", category);
routes.use("/product", product)

export default routes;