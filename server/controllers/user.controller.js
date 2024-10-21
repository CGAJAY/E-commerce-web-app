// Import the User model from the models folder
import User from "../models/user.model.js";
// JWT token generation function
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt"; // To compare hashed passwords

/**
 * @desc   Register a new user
 * @route  POST /register
 * @access Public (Anyone can register)
 */

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

		// Return success response with user details
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

		// Look for a user in the database by their email address
		// User.findOne() checks if there is a user with the given email
		// If found, it returns the user document, otherwise it returns null
		const user = await User.findOne({ email });

		// If no user with that email exists, return a 401 (Unauthorized) status
		// This means the email is not registered or doesn't match
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		// Compare the provided password with the hashed password stored in the database
		// bcrypt.compare() returns true if the password matches, false otherwise
		const isMatch = await bcrypt.compare(
			password,
			user.password // user.password is the hashed password stored in the database
		);

		// If the password does not match, return a 401 status with an error message
		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		// Generate JWT token if the password matches
		const token = generateToken(user);

		// Set the generated token as a cookie in the user's browser
		// Cookies are used for session management and storing user authentication info
		// httpOnly: true - The cookie is only accessible through HTTP (not JavaScript), which adds security
		// secure: true - The cookie is only sent over HTTPS in production (secure environments)
		// maxAge - The cookie will expire in 7 days (expressed in milliseconds)
		res.cookie("token", token, {
			httpOnly: true, // For security reasons, JavaScript can't access this cookie
			secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production environments
			maxAge: 7 * 24 * 60 * 60 * 1000, // The cookie will expire in 1 week
		});

		// Send the user details to the client as a response
		res.json({
			_id: user._id, // User's unique ID
			username: user.username, // User's username
			email: user.email, // User's email address
			role: user.role, // User's role (admin, customer, etc.)
			firstName: user.firstName,
			lastName: user.lastName,
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
			return res
				.status(200)
				.json({ message: "User deleted successfully" }); // Successful deletion message
		} else {
			return res
				.status(404)
				.json({ message: "User not found" }); // User not found
		}
	} catch (error) {
		// Log the error for debugging
		console.error("Error deleting user:", error);
		// Return generic server error message
		res.status(500).json({ message: "Server error" });
	}
};

// Controller to handle the profile page
export const getProfile = async (req, res) => {
	try {
		// user's document is attached to req.user from the cookieAuth middleware
		// select() Excludes the password field
		const user = req.user;

		// Return the user's profile data
		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		// Catch any server errors and return a 500 status with an error message
		console.error("Error fetching profile:", error);
		res.status(500).json({ message: "Server error" });
	}
};
