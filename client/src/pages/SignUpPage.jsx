import React, { useEffect, useState } from "react";

const SignUp = () => {
	// Local state for form inputs
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	// Local state for error messages
	const [error, setError] = useState("");

	// Handle input change
	const handleInputChange = (e) => {
		// Destructure name and value from the event target (input field)
		const { name, value } = e.target;
		// Update the form data by keeping the previous state and updating the changed field
		setFormData((prevState) => ({
			...prevState,
			// Set the value for the field being edited
			[name]: value,
		}));
	};

	// // Function to handle form submission when the user clicks "Sign Up"
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Destructure formData to easily access values
		const {
			username,
			firstName,
			lastName,
			email,
			password,
		} = formData;

		// Basic validation to check if all fields are filled
		if (
			!username ||
			!firstName ||
			!lastName ||
			!email ||
			!password
		) {
			// Set error message if any field is empty
			setError("All fields are required");
			return; // Stop form submission if there's an error
		}

		try {
			// Send POST request to the server create a new user
			const response = await fetch("", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					firstName,
					lastName,
					email,
					password,
					role: "customer", // Default to 'customer'
				}),
			});

			const data = await response.json();

			if (response.ok) {
				console.log("User created successfully", data);
			} else {
				// error message if the response is not ok
				setError(data.message);
			}
		} catch (error) {
			setError(
				"Failed to sign up. Please try again later."
			);
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-lg">
			<h2 className="text-2xl mb-4 text-center">Sign Up</h2>
			{error && (
				<p className="text-red-500 text-center mb-4">
					{error}
				</p>
			)}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-700"
					>
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-700"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUp;
