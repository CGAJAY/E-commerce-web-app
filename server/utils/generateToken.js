import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

// Function to generate a JWT token
const generateToken = (userId, userRole) => {
	// Sign the token with the user's ID and return it
	return jwt.sign(
		{
			id: userId, //Payload: user's unique ID
			role: userRole, // for role-based access control }, //
		},
		process.env.JWT_SECRET, // Secret key (stored in your environment variable)
		{
			expiresIn: "30d", // Token expiration (e.g., 30 days)
		}
	);
};

export { generateToken };
