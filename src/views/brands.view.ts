import { Brand, Product } from "@prisma/client";
import { RequestHandler } from "express";
import CError from "../error/error";
import brandModel from "../models/brand.model";

export const getBrands: RequestHandler<never, { brands: Brand[] }> = async (
  _,
  res,
  next,
) => {
  try {
    const brands = await brandModel.getBrands();

    res.sendJson(brands);
  } catch (e) {
    next(e);
  }
};

export const getBrand: RequestHandler<
  { brandId: string },
  { brand: Brand & { products: Product[] } }
> = async (req, res, next) => {
  try {
    const brand = await brandModel.getBrand(Number(req.params.brandId));
    if (!brand) throw new CError("No brand", 404);

    res.sendJson(brand);
  } catch (e) {
    next(e);
  }
};
