// Import the User model from the models folder
import User from "../models/user.model.js";

/**
 * @desc   Register a new user
 * @route  POST /register
 * @access Public (Anyone can register)
 */
// Controller function to handle user registration
export const registerUser = async (req, res) => {
	// Extract fields from the request body: firstName, lastName, email, password, and role
	const {
		firstName,
		lastName,
		email,
		password,
		role,
		username,
	} = req.body;

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
		username, // The user's user name (e.g., "IamJohn")
		firstName, // The user's first name (e.g., "John")
		lastName, // The user's last name (e.g., "Doe")
		email, // The user's email address
		password, // The user's password (ensure it's hashed in the User model using a pre-save hook)
		role: role || "customer", // If no role is provided, default to 'customer'. Otherwise, use the provided role (e.g., 'admin' or 'customer')
	});

	// Save the new user to the database
	const savedUser = await newUser.save();

	// After saving the user, return a success response with user details
	res.status(201).json({
		_id: savedUser._id, // Return the user's unique ID
		username: savedUser.username, // Return the registered user name
		firstName: savedUser.firstName, // Return the registered first name
		lastName: savedUser.lastName, // Return the registered last name
		email: savedUser.email, // Return the registered email
		role: savedUser.role, // Return the user's role (either 'customer' or 'admin')
	});
};

/**
 * @desc   Login an existing user
 * @route  POST /login
 * @access Public (Anyone can log in)
 */
// Controller function to handle user registration
export const loginUser = async (req, res) => {
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
		});
	} else {
		// If invalid credentials, send a 401 (Unauthorized) error
		res
			.status(401)
			.json({ message: "Invalid email or password" });
	}
};
