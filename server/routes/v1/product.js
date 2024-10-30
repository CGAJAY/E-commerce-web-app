import { Router } from "express";
import {
	createProduct,
	getAllProducts,
} from "../../controllers/product.js";
import { validateNewProduct } from "../../Middlewares/productValidator.js";
import {
	isAdmin,
	requiresAuthentication,
} from "../../Middlewares/auth.js";

const productRouter = Router();

// /api/v1/products/
productRouter.get("/", getAllProducts);

// /api/v1/products/add
productRouter.post(
	"/add",
	requiresAuthentication,
	isAdmin,
	validateNewProduct,
	createProduct
);

export { productRouter };
