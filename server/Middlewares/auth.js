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

		// If token is valid, assign user data from payload to req.user
		req.user = payload;

		// move to next middleware
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: "You are not authenticated" });
	}
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
	// req.user is populated by the cookieAuth middleware
	// Check if req.user exists and if the user's role is 'admin'
	if (req.user && req.user.role === "admin") {
		// If the user is an admin, proceed to the next middleware or route handler
		next();
	} else {
		// If the user is not an admin, respond with a 403 Forbidden status
		// This means the user is not allowed to access this route
		res
			.status(403)
			.json({ message: "Access denied. Admins only." });
	}
};
