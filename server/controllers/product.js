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
