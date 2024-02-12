import { Router } from "express";
import authGuard from "../guard/auth.guard";
import { order } from "../views/order.view";

const orderController = Router();

orderController.post("/", authGuard, order);

export default orderController;
