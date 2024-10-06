// Import the User model from the models folder
import User from "../models/user.model.js";
// JWT token generation function
import { generateToken } from "../utils/generateToken.js";

/**
 * @desc   Register a new user
 * @route  POST /register
 * @access Public (Anyone can register)
 */

// Controller function to handle user registration
export const registerUser = async (req, res) => {
	// Extract fields from the request body: firstName, lastName, email, password, role, and username
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

		// Create a new user instance with the provided details
		const newUser = new User({
			username,
			firstName,
			lastName,
			email,
			password, // This will be hashed automatically in the schema
			role: role || "customer", // Default role to 'customer' if not provided
		});

		// Save the new user to the database
		const savedUser = await newUser.save();

		// Return success response with user details and JWT
		res.status(201).json({
			_id: savedUser._id, // Return the user's unique ID
			username: savedUser.username, // Return the registered username
			firstName: savedUser.firstName, // Return the registered first name
			lastName: savedUser.lastName, // Return the registered last name
			email: savedUser.email, // Return the registered email
			role: savedUser.role, // Return the user's role (either 'customer' or 'admin')
			token: generateToken(savedUser._id), // Return a JWT token for authentication
		});
	} catch (error) {
		// If an error occurs, return a 500 Internal Server Error response with the error message
		// Log the error for debugging
		console.error("Error registering user:", error);
		// Return generic server error message
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * @desc   Login an existing user
 * @route  POST /login
 * @access Public (Anyone can log in)
 */

// Controller to handle user login
export const loginUser = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });

		// Check if the user exists and the password matches
		if (user && (await user.matchPassword(password))) {
			// If valid, return user data and JWT token
			res.json({
				_id: user._id, // User's ID
				username: user.username, // User's username
				email: user.email, // User's email
				role: user.role, // User's role
				token: generateToken(user._id), // Return JWT token
			});
		} else {
			// If invalid credentials, send a 401 (Unauthorized) error
			res
				.status(401)
				.json({ message: "Invalid email or password" });
		}
	} catch (error) {
		// If an error occurs, return a 500 Internal Server Error response with the error message
		console.error("Error logging in user:", error); // Log the error for debugging
		res.status(500).json({ message: "Server error" }); // Return generic server error message
	}
};
