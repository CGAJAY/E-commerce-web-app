import Category from "../models/category.model";

// Function to add a new category to the database
export const addCategory = async (req, res) => {
	// Get the product details from the request body

	const { name, slug } = req.body;
	try {
		// Check if all fields are provided
		if (!name || !slug) {
			return res
				.status(400)
				.json({ message: "All fields are required" });
		}
		// Check if name is an empty string
		if (name.trim() === "") {
			return res
				.status(400)
				.json({ message: "Name can't be empty" });
		}

		// Check if slug is an empty string
		if (slug.trim() === "") {
			return res
				.status(400)
				.json({ message: "Slug can't be empty" });
		}

		// Check if slug already exists
		const slugExists = await Category.findOne({ slug });

		// If slug exists respond with a status of 400 to show bad request
		if (slugExists) {
			return res
				.status(400)
				.json({ message: "Slug already exists!" });
		}

		// Create a new category
		const newCategory = new Category({ name, slug });

		// Save the new category in the database
		await newCategory.save();

		// Return success response
		return res.status(201).json({
			message: "Category added successfully",
			newCategory,
		});
	} catch (error) {
		// Return a generic server error
		res.status(500).json({ message: "server error" });
	}
};
