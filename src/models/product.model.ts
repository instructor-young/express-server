import prisma from "../prisma/client.prisma";

class ProductModel {
  async getProducts() {
    const products = await prisma.product.findMany({
      include: { brand: true },
    });

    return products;
  }

  async getProduct(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { brand: true },
    });

    return product;
  }
}

const productModel = new ProductModel();

export default productModel;
