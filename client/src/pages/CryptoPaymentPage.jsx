import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CryptoPaymentPage = () => {
	const { clearCart } = useCartStore((state) => state);
	const { isAuthenticated } = useAuthStore(
		(state) => state
	);
	const [myCart, setMyCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [selectedCrypto, setSelectedCrypto] =
		useState("ethereum");
	const [walletAddress, setWalletAddress] = useState("");
	const [transactionHash, setTransactionHash] =
		useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const navigate = useNavigate();

	// Fetch cart details
	const fetchCart = async () => {
		try {
			if (isAuthenticated) {
				const response = await fetch(
					`${backendUrl}/api/v1/cart`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
						credentials: "include",
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch cart");
				}

				const data = await response.json();
				setMyCart(data.cart);

				// Calculate and set total price
				const price = data.cart.reduce(
					(acc, item) => acc + item.price * item.quantity,
					0
				);
				setTotalPrice(price);
			}
		} catch (error) {
			console.error("Error fetching cart:", error);
			setMyCart([]);
			setTotalPrice(0);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchCart();
		}
	}, [isAuthenticated]);

	// Handle payment confirmation
	const handlePayment = async () => {
		if (walletAddress.length <= 5) {
			alert(
				"Wallet address must be more than 5 characters."
			);
			return;
		}

		if (transactionHash.length <= 5) {
			alert(
				"Transaction hash must be more than 5 characters."
			);
			return;
		}

		setIsProcessing(true);

		try {
			const response = await fetch(
				`${backendUrl}/api/v1/cart/update-status`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({
						walletAddress,
						transactionHash,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update order status");
			}

			const data = await response.json();
			clearCart();
			alert(
				`Payment confirmed! Order updated: ${data.order.status}`
			);
			navigate("/");
		} catch (error) {
			console.error("Error confirming payment:", error);
			alert(
				"An error occurred while confirming payment. Please try again."
			);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
					Crypto Payment
				</h1>
				<form className="space-y-4">
					{/* Cryptocurrency Selection */}
					<div>
						<label
							htmlFor="crypto"
							className="block text-sm font-medium text-gray-700"
						>
							Select Cryptocurrency
						</label>
						<select
							id="crypto"
							value={selectedCrypto}
							onChange={(e) =>
								setSelectedCrypto(e.target.value)
							}
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="ethereum">
								Ethereum (ETH)
							</option>
							<option value="bitcoin">Bitcoin (BTC)</option>
							<option value="solana">Solana (SOL)</option>
						</select>
					</div>

					{/* Wallet Address */}
					<div>
						<label
							htmlFor="walletAddress"
							className="block text-sm font-medium text-gray-700"
						>
							Wallet Address
						</label>
						<input
							type="text"
							id="walletAddress"
							value={walletAddress}
							onChange={(e) =>
								setWalletAddress(e.target.value)
							}
							placeholder="Enter your wallet address"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Total Amount */}
					<div>
						<label
							htmlFor="amount"
							className="block text-sm font-medium text-gray-700"
						>
							Total Amount (in USD)
						</label>
						<div className="mt-1 block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
							${totalPrice.toFixed(2)}
						</div>
					</div>

					{/* Transaction Hash */}
					<div>
						<label
							htmlFor="paymentConfirmation"
							className="block text-sm font-medium text-gray-700"
						>
							Transaction Hash (Confirmation)
						</label>
						<input
							type="text"
							id="paymentConfirmation"
							value={transactionHash}
							onChange={(e) =>
								setTransactionHash(e.target.value)
							}
							placeholder="Enter your transaction hash"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Confirm Payment Button */}
					<div className="mt-6">
						<button
							type="button"
							onClick={handlePayment}
							disabled={isProcessing}
							className={`w-full py-2 px-4 rounded-md text-white ${
								isProcessing
									? "bg-gray-400"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							{isProcessing
								? "Processing..."
								: "Confirm Payment"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CryptoPaymentPage;
