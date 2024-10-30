import { Router } from "express";
import {
	createProduct,
	getAllProducts,
	getProductsByCategory,
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

// /api/v1/products/:category
productRouter.get("/:category", getAllProducts);

export { productRouter };
