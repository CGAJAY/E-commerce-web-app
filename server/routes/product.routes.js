import express from "express";
// middleware for authentication
import cookieAuth from "../middlewares/cookieAuth.js";
// Import your admin check middleware
import { isAdmin } from "../Middlewares/isAdmin.js";
import {
	addProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";

const productRoutes = express.Router();

// Apply cookieAuth to ensure the user is authenticated
productRoutes.use(cookieAuth);

// use isAdmin middleware to all routes that require admin access

// Add a new product (admin only)
productRoutes.post("/products", isAdmin, addProduct);
// Update an existing product by ID (admin only)
productRoutes.patch(
	"/products/:id",
	isAdmin,
	updateProduct
);
// Delete a product by ID (admin only)
productRoutes.delete(
	"/products/:id",
	isAdmin,
	deleteProduct
);
// Get all products (available to all authenticated users)
productRoutes.get("/products", getAllProducts);
// Get a product by ID (available to all authenticated users)
productRoutes.get("/products/:id", getProductById);

export default productRoutes;
