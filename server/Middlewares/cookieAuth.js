import jwt from "jsonwebtoken"; // To verify JWT tokens
import dotenv from "dotenv"; // To load environment variables

dotenv.config(); // Load environment variables from .env file

// Middleware to check if the user is authenticated by verifying a JWT from cookies
const cookieAuth = (req, res, next) => {
	try {
		// Get the token from cookies (the token is expected to be stored under the 'token' key)
		const token = req.cookies.token;

		// Check if the token is missing
		// If no token is found, return a 401 Unauthorized response
		if (!token) {
			return res
				.status(401)
				.json({ message: "Not authorized, no token" });
		}

		// Verify the token using the secret key (stored in environment variables for security)
		// If the token is valid, jwt.verify() returns the decoded payload (user information and some metadata like iat and exp).
		//If the token is invalid (e.g., tampered with or expired), it will throw an error instead of returning a decoded payload.
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		// If the token is valid, attach the user information (from the token payload) to the request object
		// This allows the next middleware or route handler to know which user is making the request
		req.user = decoded.user;

		// Call next() to proceed to the next middleware or route handler
		next();
	} catch (error) {
		// If token verification fails, return a 401 Unauthorized response
		console.error("Token verification failed:", error);
		res
			.status(401)
			.json({ message: "Not authorized, token failed" });
	}
};

export default cookieAuth;
