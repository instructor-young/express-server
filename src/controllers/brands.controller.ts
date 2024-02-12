import { Router } from "express";
import { getBrand, getBrands } from "../views/brands.view";

const brandsController = Router();

brandsController.get("/", getBrands);
brandsController.get("/:brandId", getBrand);

export default brandsController;
