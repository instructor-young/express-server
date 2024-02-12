import prisma from "../prisma/client.prisma";

class BrandModel {
  async getBrands() {
    const brands = await prisma.brand.findMany();

    return brands;
  }

  async getBrand(brandId: number) {
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
      include: { products: { include: { brand: true } } },
    });

    return brand;
  }
}

const brandModel = new BrandModel();

export default brandModel;
