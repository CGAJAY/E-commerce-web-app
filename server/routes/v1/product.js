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
// import productFileUpload from "../../multer/productFileUpload.js";
import multer from "multer";
import { productFileUpload } from "../../multer/productFileUpload.js";

const productRouter = Router();

// /api/v1/products/
productRouter.get("/", getAllProducts);

// /api/v1/products/:id
productRouter.get("/:id", getProductById);

// /api/v1/products/:category
productRouter.get("/category/:slug", getProductsByCategory);

productRouter.use(requiresAuthentication, isAdmin);

// PROTECTED ROUTES

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

// /api/v1/products/add
productRouter.post(
	"/add",
	isAdmin,
	productFileUpload,
	validateNewProduct,
	createProduct
);

// /api/v1/products/:id
productRouter.patch("/:id", updateProduct);

// /api/v1/products/:id
productRouter.delete("/:id", deleteProduct);

export { productRouter };
