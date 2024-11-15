import User from "../db/models/User.js";
// bcrypt for password hashing
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateJwtToken } from "../utils/generate-jwt-token.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";

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

		const verificationCode = generateVerificationCode();

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
			verificationCode,
			verificationCodeExpiresAt:
				Date.now() + 24 * 60 * 60 * 1000, // 24hrs
			isConfirmed: false, // User is not confirmed by default
		});

		// Send the confirmation email
		await sendVerificationEmail(email, verificationCode);

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

//  checks the code the user enters if it matches the stored code, marks the user as confirmed.
export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		// Check if user entered the code
		if (!code) {
			return res
				.status(400)
				.json({ message: "Please Enter the code." });
		}

		// find the user with the email passed
		const user = await User.findOne({
			verificationCode: code,
			verificationCodeExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(404).json({
				message: "Invalid or expired verification code",
			});
		}

		// Mark the user as verified
		user.isVerified = true;
		// Clear the code after successful verification
		user.verificationCode = undefined;
		user.verificationCodeExpiresAt = undefined;

		await user.save();

		return res
			.status(200)
			.json({ message: "Email verified successfully." });
	} catch (error) {
		console.error("Error confirming the code:", error);
		res.status(500).json({
			message: "An error occurred. Please try again.",
		});
	}
};

export const resendCode = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res
			.status(400)
			.json({ message: "Email is required" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found." });
		}

		// Generate a new code
		const newCode = generateVerificationCode();
		user.verificationCode = newCode;
		user.verificationCodeExpiresAt =
			Date.now() + 24 * 60 * 60 * 1000;

		// Save the user with the updated verification details
		await user.save();

		// Send the verification email
		await sendVerificationEmail(email, newCode);

		res.status(200).json({
			message: "A new code has been sent to your email.",
		});
	} catch (error) {
		console.error("Error sending code", error);
		res.status(500).json({
			message: "An error occurred. Please try again.",
		});
	}
};

//Controller function to handle login requests
export const loginUser = async (req, res) => {
	try {
		// Destructure the email and password from the request body
		const { username, password } = req.body;

		// Check if a user with this username exists in the database
		const user = await User.findOne({ username });

		// If no user is found, return a 400 status with an error message
		if (!user) {
			res.status(400).json({
				message: "Incorrect Credentials.",
			});
			return; // Exit if the user is not found
		}

		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(
			password,
			user.password
		);

		// If the password is incorrect, return a 400 status with an error message
		if (!isPasswordMatch) {
			res.status(400).json({
				message: "Incorrect credentials - password.",
			});
			return; // Exit if the password is incorrect
		}

		// Destructure out unwanted fields and create a new user object
		const {
			password: _,
			cart,
			createdAt,
			updatedAt,
			__v,
			...userWithoutSensitiveFields
		} = user.toObject();

		// pass the res object to create a cookie containing the jwt
		// Generate JWT token with filtered user details (no sensitive info)
		generateJwtToken(res, userWithoutSensitiveFields);

		// Respond with the filtered user details and a success message
		res.status(200).json(userWithoutSensitiveFields);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

//Controller function to handle logou requests
export const logoutUser = async (req, res) => {
	// Clear the cookie when the user logs out
	res
		.status(200)
		.clearCookie(process.env.AUTH_COOKIE_NAME)
		.json({ message: "Logout Successful" });
};

//Controller function to handle deleteUser requests for admin only
export const deleteUser = async (req, res) => {
	try {
		// Extract user ID from the request parameters
		const { id } = req.params;

		// Find the user by ID and delete them from the database
		const deletedUser = await User.findByIdAndDelete(id);

		// If no user was found, return a 404 status with an error message
		if (!deletedUser) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		// If deletion was successful, send a success message
		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error(error);
		// Send a 500 status if there's a server error
		res.status(500).json({ message: "Server error" });
	}
};

// Verify the Cookie on Each Page Load
export const verifyUser = async (req, res) => {
	// Get the JWT (token) from the cookies
	const token = req.cookies[process.env.AUTH_COOKIE_NAME];
	try {
		if (!token) {
			return res
				.status(401)
				.json({ error: "Not authenticated" });
		}

		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET
		);
		return res.status(200).json(payload.user);
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};
