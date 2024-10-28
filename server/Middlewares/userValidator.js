// Middleware function to validate user registration input
export const validateUserRegistration = async (
	req,
	res,
	next
) => {
	try {
		// Destructuring user data from the req body
		const {
			firstName,
			lastName,
			email,
			password,
			role,
			username,
		} = req.body;

		// Check if all fields are provided
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!username
		) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}

		// Check if FirstName is an empty string
		if (firstName.trim() === "") {
			return res
				.status(400)
				.json({ message: "FirstName cannot be empty" });
		}
		// Check if LastName is an empty string
		if (lastName.trim() === "") {
			return res
				.status(400)
				.json({ message: "LastName cannot be empty" });
		}
		// Check if UserName is an empty string
		if (username.trim() === "") {
			return res
				.status(400)
				.json({ message: "UserName cannot be empty" });
		}
		// Validate the email format using a regular expression (regex)
		const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
		if (!emailRegex.test(email)) {
			return res
				.status(400)
				.json({ message: "Email is invalid." });
		}

		// Password validation
		if (password.length < 6) {
			return res.status(400).json({
				message:
					"password must be atleast 6 characters long",
			});
		}

		let hasLowerCase = false;
		let hasUpperCase = false;
		let hasNumber = false;

		// Iterate through each char in the password
		for (let i = 0; i < password.length; i++) {
			let char = password[i];
			if (char >= "a" && char <= "z") {
				hasLowerCase = true;
			} else if (char >= "A" && char <= "Z") {
				hasUpperCase = true;
			} else if (char >= "0" && char <= "9") {
				hasNumber = true;
			}
		}

		// Check if all conditions are met
		if (!hasLowerCase || !hasUpperCase || !hasNumber) {
			return res.status(400).json({
				message:
					"Password must contain at least one lowercase letter, one uppercase letter and one number",
			});
		}

		// Call the next middleware function if all validations pass
		next();
	} catch (error) {
		// Handle any unexpected errors
		console.error(error);
		return res
			.status(500)
			.json({ message: "An unexpected error occurred." });
	}
};

// Middleware function to validate user login input
export const validateLogin = async (req, res, next) => {
	try {
		// Destructure the username and password from the req body
		const { username, password } = req.body;

		// Check if username and password are provided
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: "All fields are required" });
		}

		// Check if the username is an empty string
		if (username.trim() === "") {
			return res
				.status(400)
				.json({ message: "Username cannot be empty" });
		}

		// Check if the password is greater than 5 characters
		if (password.length < 6) {
			return res.status(400).json({
				message:
					"Password must Must have More than 5 characters",
			});
		}

		// Call the next middleware function if all validations pass
		next();
	} catch (error) {}
};
