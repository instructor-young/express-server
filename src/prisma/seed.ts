import { PrismaClient } from "@prisma/client";
import data from "../../data.json";

const prisma = new PrismaClient();

async function main() {
  const products = data.products;

  for (const product of products) {
    const brandId = product.brandno;
    const brandNameKr = product.brandnm_kr;
    const brandNameEn = product.brandnm;

    const brand = await prisma.brand.upsert({
      where: { id: brandId },
      create: { id: brandId, nameKr: brandNameKr, nameEn: brandNameEn },
      update: { nameKr: brandNameKr, nameEn: brandNameEn },
    });

    const productId = Number(product.id);
    const productName = product.goodsnm;
    const productImgSrc = product.img_i;
    const productOriginalPrice = product.consumer;
    const productPrice = product.price;

    await prisma.product.upsert({
      where: { id: productId },
      create: {
        id: productId,
        name: productName,
        brandId: brand.id,
        deliveryType: "당일배송",
        imgSrc: productImgSrc,
        onlineStock: 200,
        originalPrice: productOriginalPrice,
        price: productPrice,
      },
      update: {
        name: productName,
        brandId: brand.id,
        deliveryType: "당일배송",
        imgSrc: productImgSrc,
        onlineStock: 200,
        originalPrice: productOriginalPrice,
        price: productPrice,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
