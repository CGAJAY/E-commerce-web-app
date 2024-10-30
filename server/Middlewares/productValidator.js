// Middleware function to validate addition of new product input
export const validateNewProduct = async (
	req,
	res,
	next
) => {
	// Get the product details from the request body
	const { name, price, stock, categorySlug } = req.body;
	try {
		// Check if all required fields are provided
		// If any field is missing, respond with a 400 Bad Request error
		// If at least one of the operands evaluates to a truthy value, the expression returns that truthy value.
		if (
			!name ||
			!price ||
			!categorySlug ||
			stock === undefined // stock can be 0 which is a falsy value
		) {
			return res.status(400).json({
				message: "All fields are required",
			});
		}

		// Check if name is an empty string
		if (name.trim() === "") {
			return res
				.status(400)
				.json({ message: "name cannot be empty" });
		}

		// Check if price is an empty string
		if (price.trim() === "") {
			return res
				.status(400)
				.json({ message: "price cannot be empty" });
		}

		// Check if category is an empty string
		if (categorySlug.trim() === "") {
			return res
				.status(400)
				.json({ message: "category cannot be empty" });
		}

		// Check if stock is an empty string
		if (stock.trim() === "") {
			return res
				.status(400)
				.json({ message: "stock cannot be empty" });
		}

		if (isNaN(parseInt(stock))) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "stock must be a number",
			});
		}

		// Call the next middleware function if all validations pass
		next();
	} catch (error) {
		// Handle any unexpected errors
		console.error(error);
		return res
			.status(500)
			.json({ message: "An unexpected error occurred." });
	}
};
