import { Cart, CartItem } from "@prisma/client";
import { RequestHandler } from "express";
import cartModel from "../models/cart.model";

export const getCart: RequestHandler<never, { cart: Cart }> = async (
  req,
  res,
  next,
) => {
  try {
    const user = req.user;
    const cart = await cartModel.getCartByUserId(user.id);
    if (!cart) throw new Error("No cart");

    res.json({ cart });
  } catch (e) {
    next(e);
  }
};

export const addItemToCart: RequestHandler<
  { productId: string },
  { cartItem: CartItem }
> = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const cartItem = await cartModel.addItemToCart(user.id, Number(productId));

    res.json({ cartItem });
  } catch (e) {
    next(e);
  }
};

export const removeItemFromCart: RequestHandler<
  { productId: string },
  { cartItem: CartItem }
> = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const cartItem = await cartModel.removeItemFromCart(
      user.id,
      Number(productId),
    );
    if (!cartItem) throw new Error("No CartItem");

    res.json({ cartItem });
  } catch (e) {
    next(e);
  }
};

export const clearItemInCart: RequestHandler<
  { productId: string },
  { cartItem: CartItem }
> = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const cartItem = await cartModel.addItemToCart(user.id, Number(productId));
    if (!cartItem) throw new Error("No CartItem");

    res.json({ cartItem });
  } catch (e) {
    next(e);
  }
};
