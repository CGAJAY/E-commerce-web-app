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
productRoutes.post("/add", isAdmin, addProduct);
// Update an existing product by ID (admin only)
productRoutes.patch("/:id", isAdmin, updateProduct);
// Delete a product by ID (admin only)
productRoutes.delete("/:id", isAdmin, deleteProduct);
// Get all products (available to all authenticated users)
productRoutes.get("/", getAllProducts);
// Get a product by ID (available to all authenticated users)
productRoutes.get("/:id", getProductById);

export default productRoutes;
