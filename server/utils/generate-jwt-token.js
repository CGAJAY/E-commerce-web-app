import jwt from "jsonwebtoken";

// Generate a JWT token using the 'user' object as payload
export const generateJwtToken = (res, user) => {
	// (user) is user details like the user's _id
	// (res) is request object used for setting the cookie containing the token
	// jwt.sign() takes in the payload, secret key and options such as the token's expiry.

	const token = jwt.sign({ user }, process.env.JWT_SECRET, {
		expiresIn: "1d", // Token set to expire in 1 day
	});

	// set the token in a cookie in the response 'res' object
	// Stores the JWT in a cookie for secure client-side storage
	res.cookie(process.env.AUTH_COOKIE_NAME, token, {
		httpOnly: true, // Prevents JS from accessing the cookie(protection against XSS attacks)
		maxAge: 24 * 60 * 60 * 1000, //Cookie expires in 1 day
		sameSite: "strict", // Ensures the cookie is only sent in requests originating from the same site
		secure: process.env.NODE_ENV === "production", // When in production mode, cookie is sent over HTTPS
	});
};
