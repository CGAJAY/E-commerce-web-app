import { Router } from "express";
import { createProduct } from "../../controllers/product.js";
import { validateNewProduct } from "../../Middlewares/productValidator.js";
import {
	isAdmin,
	requiresAuthentication,
} from "../../Middlewares/auth.js";

const productRouter = Router();

// /api/v1/product/
// productRouter.get("/");

// /api/v1/product/add
productRouter.post(
	"/add",
	requiresAuthentication,
	isAdmin,
	validateNewProduct,
	createProduct
);

export { productRouter };
