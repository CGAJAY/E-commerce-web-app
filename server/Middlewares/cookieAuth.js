import jwt from "jsonwebtoken"; // To verify JWT tokens
import dotenv from "dotenv"; // To load environment variables

dotenv.config(); // Load environment variables from .env file

// Middleware to check if the user is authenticated
const cookieAuth = (req, res, next) => {
	try {
		// Get the token from cookies
		const token = req.cookies.token;

		// If no token is found, return a 401 Unauthorized response
		if (!token) {
			return res
				.status(401)
				.json({ message: "Not authorized, no token" });
		}

		// Verify the token using the secret key from the environment variables
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		// If token is valid, attach the user ID (from token payload) to the request object
		req.userId = decoded.id;

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
