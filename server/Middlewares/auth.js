import jwt from "jsonwebtoken";

// middleware to check user Authentication
export const requiresAuthentication = (req, res, next) => {
	// Get the JWT (token) from the cookies
	const token = req.cookies[process.env.AUTH_COOKIE_NAME];

	// if token doesn't exist, user is not authenticated
	if (!token) {
		// send 401 Unauthorized status
		return res
			.status(401)
			.json({ message: "You are not authenticated" });
	}

	try {
		// if the token exist, verify it's valid
		// if not it throws an error
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		// if token is valid extract the user's _id from the token payload
		req.userId = payload.user._id;

		// move to next middleware
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: "You are not authenticated" });
	}
};
