import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { email } = location.state;

	const handleCodeSubmit = async (e) => {
		e.preventDefault();

		if (!code) {
			setError("Please enter the confirmation code.");
			return;
		}

		try {
			const response = await fetch("/api/confirm-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, code }),
			});

			const data = await response.json();

			if (response.ok) {
				navigate("/login"); // Redirect to login or dashboard
			} else {
				setError(data.message);
			}
		} catch (error) {
			setError("Failed to confirm code. Please try again.");
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow-lg">
			<h2 className="text-2xl mb-4 text-center">
				Confirm Email
			</h2>
			{error && (
				<p className="text-red-500 text-center mb-4">
					{error}
				</p>
			)}
			<form onSubmit={handleCodeSubmit}>
				<div className="mb-4">
					<label
						htmlFor="code"
						className="block text-sm font-medium text-gray-700"
					>
						Confirmation Code
					</label>
					<input
						type="text"
						id="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					Verify Code
				</button>
			</form>
		</div>
	);
};

export default ConfirmEmail;
