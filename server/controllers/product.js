// Import the Product model from the models directory
import Product from "../db/models/product.js";

// Import the Category model
import Category from "../db/models/category.js";

// Function to create a new product
export const createProduct = async (req, res) => {
	const { name, price, categorySlug, description, stock } =
		req.body;

	try {
		// Check if a file was uploaded
		if (!req.file) {
			return res.status(400).json({
				message: "Product image is required",
			});
		}

		const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

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
			price: parseInt(price),
			category: category._id, // Use category's ObjectId
			stock: parseInt(stock),
			description,
			image: imageUrl, // Set the file path as image URL
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
		console.log(category);

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

// Get a product by ID
export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).populate(
			"category"
		);

		if (!product) {
			return res
				.status(404)
				.json({ message: "Product not found." });
		}

		res.status(200).json(product);
	} catch (error) {
		console.error("Error fetching product:", error);
		res.status(500).json({
			message: "Server error while fetching product.",
		});
	}
};

// Update a product by ID
export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			updatedData,
			{
				new: true, // Return the updated product
				runValidators: true, // Ensure validation on update
			}
		).populate("category");

		if (!updatedProduct) {
			return res
				.status(404)
				.json({ message: "Product not found." });
		}

		res.status(200).json(updatedProduct);
	} catch (error) {
		console.error("Error updating product:", error);
		res.status(500).json({
			message: "Server error while updating product.",
		});
	}
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProduct = await Product.findByIdAndDelete(
			id
		);

		if (!deletedProduct) {
			return res
				.status(404)
				.json({ message: "Product not found." });
		}

		res
			.status(200)
			.json({ message: "Product deleted successfully." });
	} catch (error) {
		console.error("Error deleting product:", error);
		res.status(500).json({
			message: "Server error while deleting product.",
		});
	}
};
