// Middleware function to validate addition of new product input
export const validateNewProduct = async (
	req,
	res,
	next
) => {
	// Get the product details from the request body
	const { name, price, stock, categorySlug, description } =
		req.body;
	try {
		if (
			!name ||
			!price ||
			!categorySlug ||
			!description ||
			!stock
		) {
			return res.status(400).json({
				message: "All fields are required",
			});
		}

		if (isNaN(price) || price <= 0) {
			return res.status(400).json({
				message: "Price must be a valid positive number",
			});
		}

		if (isNaN(stock) || stock < 0) {
			return res.status(400).json({
				message:
					"Stock must be a valid non-negative number",
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
