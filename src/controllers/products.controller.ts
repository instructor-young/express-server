import { Router } from "express";
import { getProduct, getProducts } from "../views/products.view";

const productsController = Router();

productsController.get("/", getProducts);
productsController.get("/:productId", getProduct);

export default productsController;
