// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
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

export default isAdmin;
