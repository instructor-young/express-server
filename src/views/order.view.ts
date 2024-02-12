import { RequestHandler } from "express";

export const order: RequestHandler<
  never,
  { orderId: string },
  { cartItemIds: number[] }
> = async (_, res, next) => {
  try {
    // const user = req.user;
    // const { cartItemIds } = req.body;
    // const cartItem = await cartModel.addItemToCart(user.id, Number(productId));

    res.sendJson({ orderId: "blabla" });
  } catch (e) {
    next(e);
  }
};
