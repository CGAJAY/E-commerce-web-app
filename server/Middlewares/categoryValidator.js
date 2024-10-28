// Middleware function to validate user registration input
export const validateNewCategory = async (
	req,
	res,
	next
) => {
	// Get the product name from the request body
	const { name } = req.body;
	try {
		// Check if all fields are provided
		if (!name) {
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
