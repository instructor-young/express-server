import { Router } from "express";
import authController from "./auth.controller";
import brandsController from "./brands.controller";
import cartController from "./cart.controller";
import productsController from "./products.controller";
import usersController from "./users.controller";

const controllers = Router();

controllers.get("/health-check", (_, res) => res.status(200).send());

controllers.use("/auth", authController);
controllers.use("/brands", brandsController);
controllers.use("/cart", cartController);
controllers.use("/products", productsController);
controllers.use("/users", usersController);

export default controllers;
