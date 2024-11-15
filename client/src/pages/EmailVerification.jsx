import React, { useState, useEffect } from "react";
import {
	useSearchParams,
	useNavigate,
} from "react-router-dom";

const EmailVerification = () => {
	const [searchParams] = useSearchParams();
	const email = searchParams.get("email"); // Get email from query params
	const [code, setCode] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	// Initialize `useNavigate` hook to programmatically navigate between pages
	const navigate = useNavigate();

	useEffect(() => {
		if (!email) {
			setError("Email is missing. Please try again.");
		}
	}, [email]);

	const handleVerifyEmail = async (e) => {
		console.log(email);
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError("");

		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/verify-email",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ code }),
				}
			);

			const data = await response.json();

			if (response.ok) {
				setMessage(data.message); // Email verified successfully
				navigate("/login");
			} else {
				setError(
					data.message ||
						"Verification failed. Please try again."
				);
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
		setLoading(false);
	};

	const handleResendCode = async () => {
		setLoading(true);
		setMessage("");
		setError("");

		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/resend-code",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ email }),
				}
			);

			const data = await response.json();

			if (response.ok) {
				setMessage(data.message); // New code sent successfully
			} else {
				setError(
					data.message ||
						"Failed to resend code. Please try again."
				);
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-blue-100">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
				<h1 className="text-xl font-bold text-black mb-4">
					Email Verification
				</h1>
				<p className="text-gray-700 mb-6">
					We’ve sent a confirmation code to
					<span className="font-semibold">{email}</span>.
					Enter it below to verify your email:
				</p>

				<form
					onSubmit={handleVerifyEmail}
					className="space-y-4"
				>
					<input
						type="text"
						placeholder="Enter verification code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="submit"
						disabled={loading}
						className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
							loading
								? "bg-blue-300"
								: "bg-blue-500 hover:bg-blue-600"
						}`}
					>
						{loading ? "Verifying..." : "Verify Email"}
					</button>
				</form>

				<button
					onClick={handleResendCode}
					disabled={loading}
					className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded-lg ${
						loading
							? "bg-gray-300"
							: "bg-black hover:bg-gray-800"
					}`}
				>
					{loading ? "Resending..." : "Resend Code"}
				</button>

				{message && (
					<p className="mt-4 text-green-600 font-semibold">
						{message}
					</p>
				)}
				{error && (
					<p className="mt-4 text-red-600 font-semibold">
						{error}
					</p>
				)}
			</div>
		</div>
	);
};

export default EmailVerification;
