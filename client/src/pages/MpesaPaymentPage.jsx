import React, { useState } from "react";

const MpesaPaymentPage = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [amount, setAmount] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handlePayment = async (e) => {
		e.preventDefault();

		if (!phoneNumber || !amount) {
			setMessage("Please fill in all fields.");
			return;
		}

		setLoading(true);
		setMessage("");

		try {
			// Placeholder for Mpesa API integration
			const response = await fetch("/api/payments/mpesa", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ phoneNumber, amount }),
			});

			const result = await response.json();
			if (response.ok) {
				setMessage(
					"Payment request sent. Check your phone to complete the payment."
				);
			} else {
				setMessage(`Payment failed: ${result.error}`);
			}
		} catch (error) {
			setMessage(`Payment failed: ${error.message}`);
		}

		setLoading(false);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold text-center mb-6">
				Mpesa Payment
			</h1>
			<form
				onSubmit={handlePayment}
				className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
			>
				<div className="mb-4">
					<label
						htmlFor="phoneNumber"
						className="block text-sm font-medium text-gray-700"
					>
						Phone Number
					</label>
					<input
						type="text"
						id="phoneNumber"
						placeholder="2547XXXXXXXX"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="amount"
						className="block text-sm font-medium text-gray-700"
					>
						Amount
					</label>
					<input
						type="number"
						id="amount"
						placeholder="Enter amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className={`w-full py-2 px-4 rounded-md text-white font-bold ${
						loading
							? "bg-gray-400"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				>
					{loading ? "Processing..." : "Pay Now"}
				</button>
			</form>
			{message && (
				<p className="text-center mt-4 text-red-600">
					{message}
				</p>
			)}
		</div>
	);
};

export default MpesaPaymentPage;
