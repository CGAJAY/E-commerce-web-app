import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

// Function to generate a JWT token
const generateToken = (user) => {
	// Destructure the 'password' property from the 'user' object and assign it to '_'
	// The underscore (_) is a convention used to indicate that we don't need the 'password' value.
	// The rest of the properties (everything except 'password') are gathered in the 'userInfo' object.
	const { password: _, ...userInfo } = user;

	//function is used to create (or sign) a new JWT.
	return jwt.sign(
		{
			// Payload: The data to encode in the token (user's info)
			user: userInfo,
		},
		// Secret key: This is used to sign the token, making sure it's secure
		process.env.JWT_SECRET,
		{
			// Options: The token will expire after 30 days
			expiresIn: "30d",
		}
	);
};

export { generateToken };
