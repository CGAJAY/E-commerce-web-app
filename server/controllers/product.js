// Import the Product model from the models directory
import Product from "../db/models/product.js";

// Import the Category model
import Category from "../db/models/category.js";

// Function to create a new product
export const createProduct = async (req, res) => {
	try {
		const { name, price, stock, categorySlug } = req.body;

		// Find the category by its slug
		const category = await Category.findOne({
			slug: categorySlug,
		});

		// If the category doesn't exist, return a 404 error
		if (!category) {
			return res
				.status(404)
				.json({ message: "Category not found" });
		}

		// Check if a product with the same name already exists
		const existingProduct = await Product.findOne({ name });
		if (existingProduct) {
			return res
				.status(400)
				.json({ message: "Product already exists" });
		}

		// Create the new product using the found category's _id
		const newProduct = await Product.create({
			name,
			price,
			stock: parseInt(stock),
			category: category._id,
		});

		// Respond with the created product
		res.status(201).json(newProduct);
	} catch (error) {
		console.error("Error creating product:", error);
		res.status(500).json({
			message: "Server error while creating product",
		});
	}
};

// Function to get all products
export const getAllProducts = async (req, res) => {
	try {
		// Fetch all products from the database and populate the category field
		// Populate the category field with the related Category document
		const products = await Product.find().populate(
			"category"
		);

		// Respond with the list of products
		res.status(200).json(products);
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
		console.error("Error fetching products:", error);
		res.status(500).json({
			message: "Server error while fetching products.",
		});
	}
};

// Get products by category slug
export const getProductsByCategory = async (req, res) => {
	try {
		const { slug } = req.params; // Category slug from URL parameters

		// Find the category by slug
		const category = await Category.findOne({ slug });
		if (!category) {
			return res
				.status(404)
				.json({ message: "Category not found." });
		}

		// Find products in the given category
		const products = await Product.find({
			category: category._id,
		}).populate("category");

		res.status(200).json(products);
	} catch (error) {
		console.error(
			"Error fetching products by category:",
			error
		);
		res.status(500).json({
			message:
				"Server error while fetching products by category.",
		});
	}
};
