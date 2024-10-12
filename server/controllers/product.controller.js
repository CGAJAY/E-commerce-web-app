// Import the Product model from the models directory
import Product from "../models/product.model";

// Import the Category model
import Category from "../models/category.model";

// Function to add a new product to the database
export const addProduct = async (req, res) => {
	try {
		// Get the product details from the request body
		const { name, price, category, stock } = req.body;

		// Check if all required fields are provided
		// If any field is missing, respond with a 400 Bad Request error
		// If at least one of the operands evaluates to a truthy value, the expression returns that truthy value.
		if (
			!name ||
			!price ||
			!category ||
			stock === undefined // stock can be 0 which is a falsy value
		) {
			return res.status(400).json({
				message:
					"Please provide all required fields: name, price, category, and stock.",
			});
		}

		// Create a new instance of the Product model
		// This uses the product details provided in the request
		const newProduct = new Product({
			name, // Product name
			price, // Product price
			category, // Reference to the category of the product
			stock, // Amount of stock available for the product
		});

		// Save the new product instance to the database
		await newProduct.save();

		// If successful, respond with a 201 Created status and the new product data else  it throws an error
		res.status(201).json(newProduct);
	} catch (error) {
		// If there is an error, log it to the console for debugging
		console.error("Error adding product:", error);

		// Respond with a 500 Internal Server Error if something goes wrong
		res.status(500).json({ message: "Server error" });
	}
};

// Function to delete a product
export const deleteProduct = async (req, res) => {
	try {
		// Find the product by its ID from the request parameters
		const { id } = req.params;

		// If the product is found, it will be deleted from database & returns the document of the deleted product else null
		const deletedProduct = await Product.findByIdAndDelete(
			id
		);

		// If no product was found, respond with a 404 (Not Found) status
		if (!deletedProduct) {
			return res
				.status(404)
				.json({ message: "Product not found" });
		}

		// Respond with a success message upon successful deletion
		res
			.status(200)
			.json({ message: "Product deleted successfully" });
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
		console.error("Error deleting product:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Function to update a product
export const updateProduct = async (req, res) => {
	try {
		// Get the product ID and the updated data from the request
		const { id } = req.params; // Product ID from URL parameters
		const updatedData = req.body; // New data for the product

		// Check if updatedData is empty by counting the number of keys
		if (Object.keys(updatedData).length === 0) {
			// If there are no keys in updatedData, send a response with a 400 status
			// and a message indicating that no fields were provided for update
			return res
				.status(400)
				.json({ message: "No fields provided for update" });
		}

		// Find the product by its ID and update it with new data
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			updatedData,
			{
				new: true, // Return the updated product
				runValidators: true, // Ensure validators are run on the updated data
			}
		);

		// If no product was found, respond with a 404 (Not Found) status
		if (!updatedProduct) {
			return res
				.status(404)
				.json({ message: "Product not found" });
		}

		// Respond with the updated product data
		res.status(200).json(updatedProduct);
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
		console.error("Error updating product:", error);
		res.status(500).json({ message: "Server error" });
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

// Function to get a product by ID
export const getProductById = async (req, res) => {
	try {
		const { id } = req.params; // Extract the product ID from URL parameters

		// Find the product by its ID and populate the category field
		// Populate the category field with the related Category document
		const product = await Product.findById(id).populate(
			"category"
		);

		// If no product is found, respond with a 404 (Not Found) status
		if (!product) {
			return res
				.status(404)
				.json({ message: "Product not found." });
		}

		// Respond with the found product data
		res.status(200).json(product);
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
		console.error("Error fetching product:", error);
		res.status(500).json({
			message: "Server error while fetching product.",
		});
	}
};

// Function to get all products in a specific category by category name
export const getProductsByCategory = async (req, res) => {
	try {
		// Extract the category name from request body
		const { categoryName } = req.body;

		// Fetch the category by name to get its ID
		const category = await Category.findOne({
			name: categoryName,
		});

		// If no category is found, respond with a 404 (Not Found) status
		if (!category) {
			return res
				.status(404)
				.json({ message: "Category not found." });
		}

		// Fetch all products that belong to the specified category ID
		const products = await Product.find({
			category: category._id, // Match products with the found category's ID
		}).populate("category"); // Populate the category field

		// If no products are found, respond with a 404 (Not Found) status
		if (products.length === 0) {
			return res.status(404).json({
				message: "No products found in this category.",
			});
		}

		// Respond with the list of products in the specified category
		res.status(200).json(products);
	} catch (error) {
		// Catch any errors and respond with a 500 (Server Error) status
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
