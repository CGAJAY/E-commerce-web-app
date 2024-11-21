import jwt from "jsonwebtoken";

//  Middleware to verify user and extract user ID
export const verifyUserCart = (req, res, next) => {
	const token = req.cookies[process.env.AUTH_COOKIE_NAME];

	if (!token) {
		req.userId = null; // No user logged in
		return next();
	}

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET
		);

		console.log(payload.user._id);
		req.userId = payload.user._id; // Attach user ID to request
		next();
	} catch (error) {
		req.userId = null; // Invalid token
		next();
	}
};
