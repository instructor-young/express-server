import prisma from "../prisma/client.prisma";

class CartModel {
  async getCartByUserId(userId: number) {
    const cart = await prisma.cart.findUnique({
      where: { id: userId },
      include: {
        items: {
          include: { product: { include: { brand: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return cart;
  }

  async addItemToCart(userId: number, productId: number) {
    const cartItem = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: userId, productId } },
      create: { cartId: userId, productId },
      update: { quantity: { increment: 1 } },
    });

    return cartItem;
  }

  async removeItemFromCart(userId: number, productId: number) {
    const cartItem = await prisma.cartItem.update({
      where: {
        cartId_productId: { cartId: userId, productId },
      },
      data: { quantity: { decrement: 1 } },
    });
    if (cartItem.quantity === 0) await this.clearItemInCart(userId, productId);

    return cartItem;
  }

  async clearItemInCart(userId: number, productId: number) {
    const cartItem = await prisma.cartItem.delete({
      where: { cartId_productId: { cartId: userId, productId } },
    });

    return cartItem;
  }
}

const cartModel = new CartModel();

export default cartModel;
