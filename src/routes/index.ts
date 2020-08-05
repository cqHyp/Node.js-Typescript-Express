import { NextFunction, Request, Response, Router } from "express";
import user from "./user";
import banner from "./banner";
import category from "./category";
import product from "./product";
import auth from "./auth";

const routes = Router();

routes.use("/user", user);
routes.use("/banner", banner);
routes.use("/category", category);
routes.use("/product", product);
routes.use("/auth", auth);

export default routes;