import { Product } from "@prisma/client";
import { RequestHandler } from "express";
import productModel from "../models/product.model";

export const getProducts: RequestHandler<
  never,
  { products: Product[] }
> = async (_, res, next) => {
  try {
    const products = await productModel.getProducts();

    res.json({ products });
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
    if (!product) throw new Error("No product");

    res.json({ product });
  } catch (e) {
    next(e);
  }
};