import User from "../db/models/User.js";
// bcrypt for password hashing
import bcrypt from "bcryptjs";

// Controller function to handle user registration
export const registerUser = async (req, res) => {
	// Extract fields from the request body
	const {
		firstName,
		lastName,
		email,
		password,
		role,
		username,
	} = req.body;

	try {
		// Check if a user with the provided email already exists in the database
		const userExists = await User.findOne({ email });

		// If a user with the same email is found, return a 400 Bad Request response with an error message
		if (userExists) {
			return res
				.status(400)
				.json({ message: "User already exists" });
		}

		// Generate a salt for password hashing
		// Ensures hashed password are unique even if two users have same password
		const salt = bcrypt.genSaltSync(10);
		// Hashing the password using the generated salt
		const hashedPassword = bcrypt.hashSync(password, salt);

		// Create a new user in the database with the provided data
		const newUser = await User.create({
			username,
			firstName,
			lastName,
			email,
			// Store hashed password instead of plain password
			password: hashedPassword,
			// Default role to 'customer' if not provided
			role: role || "customer",
		});

		// Return success response with user details
		res.status(201).json({
			_id: newUser._id, // Return the user's unique ID
			username: newUser.username, // Return the registered username
			firstName: newUser.firstName, // Return the registered first name
			lastName: newUser.lastName, // Return the registered last name
			email: newUser.email, // Return the registered email
			role: newUser.role, // Return the user's role (either 'customer' or 'admin')
		});
	} catch (error) {
		// If an error occurs, return a 500 Internal Server Error response with the error message
		// Log the error for debugging
		console.error("Error registering user:", error);
		// Return generic server error message
		res.status(500).json({ message: "Server error" });
	}
};
