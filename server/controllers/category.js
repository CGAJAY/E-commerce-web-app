import Category from "../db/models/category.js";
import slugify from "slugify";

// Function to add a new category to the database
export const addCategory = async (req, res) => {
	// Get the product details from the request body
	const { name } = req.body;
	try {
		// Generate the slug from the category name
		// strict removes special characters
		const slug = slugify(name, {
			lower: true,
			strict: true,
		});

		// Create a new category
		const category = await Category.create({ name, slug });

		// Return success response
		return res.status(201).json({
			message: "Category added successfully",
			category,
		});
	} catch (error) {
		console.error(error);
		// Return a generic server error
		res.status(500).json({ message: "server error" });
	}
};
