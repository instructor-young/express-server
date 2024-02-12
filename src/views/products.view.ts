import { Product } from "@prisma/client";
import { RequestHandler } from "express";
import CError from "../error/error";
import productModel from "../models/product.model";

export const getProducts: RequestHandler<
  never,
  { products: Product[] }
> = async (_, res, next) => {
  try {
    const products = await productModel.getProducts();

    res.sendJson(products);
  } catch (e) {
    next(e);
  }
};

export const getProduct: RequestHandler<
  { productId: string },
  { product: Product }
> = async (req, res, next) => {
  try {
    const product = await productModel.getProduct(Number(req.params.productId));
    if (!product) throw new CError("No product", 404);

    res.sendJson(product);
  } catch (e) {
    next(e);
  }
};
