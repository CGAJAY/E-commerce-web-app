import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuthStore((state) => state);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Send login data to the backend
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					// Sending login data in the body
					body: JSON.stringify({ username, password }),
				}
			);

			// Check if the response is successful
			if (!response.ok) {
				throw new Error("Failed to login");
			}

			// convert response to JSON
			const data = await response.json();

			// Store user data in the Zustand store
			login(data);

			// Redirect to home page and scroll to the top
			navigate("/profile");
			window.scrollTo(0, 0); // Scrolls to the top of the page

			// alert("Login successful");
		} catch (error) {
			console.error("Login failed:", error.message);
			alert("Login failed");
		}
	};

	return (
		<div className="flex justify-center items-center bg-white">
			<div className="w-full max-w-md p-8 bg-white rounded-lg  border-y border-gray-200 mt-10 ">
				<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Login
				</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium mb-2"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
