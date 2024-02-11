import { Router } from "express";
import authGuard from "../guard/auth.guard";
import {
  addItemToCart,
  clearItemInCart,
  getCart,
  removeItemFromCart,
} from "../views/cart.view";

const cartController = Router();

cartController.get("/", authGuard, getCart);
cartController.post("/products/:productId", authGuard, addItemToCart);
cartController.delete("/products/:productId", authGuard, removeItemFromCart);
cartController.delete("/products/:productId/clear", authGuard, clearItemInCart);

export default cartController;
