// Import the User model from the models folder
import User from "../models/user.model.js";
// JWT token generation function
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs"; // To compare hashed passwords

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

// Controller to log in user
export const loginUser = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });

		// Check if the user exists
		// if found, findOne() returns a document that contains all the fields defined in the User schema.
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		// Compare the entered password with the hashed password in the database
		// Returns boolean value
		const isMatch = await bcrypt.compare(
			password,
			user.password
		);

		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		// Generate JWT token if the password matches
		const token = generateToken(user._id);

		// Set the JWT as a cookie in the response (httpOnly: true for security)
		res.cookie("jwt", token, {
			httpOnly: true, // Secure cookie, not accessible via JavaScript
			secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
			maxAge: 7 * 24 * 60 * 60 * 1000, // Token valid for 1 week
		});

		// Send the user data and token back to the client
		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
			token, // Return JWT token for client-side storage (if needed)
		});
	} catch (error) {
		// Catch any server errors and return a 500 status with an error message
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// Controller to handle user deletion
export const deleteUser = async (req, res) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;

		// Find the user by ID and delete them
		const user = await User.findByIdAndDelete(id);

		// Check if the user was found and deleted
		if (user) {
			res
				.status(200)
				.json({ message: "User deleted successfully" }); // Successful deletion message
		} else {
			res.status(404).json({ message: "User not found" }); // User not found
		}
	} catch (error) {
		// Log the error for debugging
		console.error("Error deleting user:", error);
		// Return generic server error message
		res.status(500).json({ message: "Server error" });
	}
};
