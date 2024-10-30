import { Router } from "express";
import {
	createProduct,
	getAllProducts,
	getProductsByCategory,
	getProductById,
	updateProduct,
	deleteProduct,
} from "../../controllers/product.js";
import { validateNewProduct } from "../../Middlewares/productValidator.js";
import {
	isAdmin,
	requiresAuthentication,
} from "../../Middlewares/auth.js";

const productRouter = Router();

// /api/v1/products/
productRouter.get("/", getAllProducts);

// /api/v1/products/:id
productRouter.get("/:id", getProductById);

// /api/v1/products/:category
productRouter.get("/category/:slug", getProductsByCategory);

productRouter.use(requiresAuthentication, isAdmin);

// PROTECTED ROUTES

// /api/v1/products/add
productRouter.post(
	"/add",
	validateNewProduct,
	createProduct
);

// /api/v1/products/:id
productRouter.patch("/:id", updateProduct);

// /api/v1/products/:id
productRouter.delete("/:id", deleteProduct);

export { productRouter };
