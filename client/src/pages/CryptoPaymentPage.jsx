import React, { useState } from "react";
import useCartStore from "../store/useCartStore"; // Import Zustand store for cart

const CryptoPaymentPage = () => {
	const cart = useCartStore((state) => state.cart); // Get cart items from store

	// Calculate subtotal from the cart
	const subtotal = cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const [selectedCrypto, setSelectedCrypto] =
		useState("ethereum");
	const [walletAddress, setWalletAddress] = useState("");

	const handleCryptoChange = (e) => {
		setSelectedCrypto(e.target.value);
	};

	const handleAddressChange = (e) => {
		setWalletAddress(e.target.value);
	};

	const handlePayment = () => {
		alert(
			`Payment initiated using ${selectedCrypto} to wallet address: ${walletAddress} for an amount of $${subtotal.toFixed(
				2
			)}`
		);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
					Crypto Payment
				</h1>

				<form className="space-y-4">
					{/* Crypto Selection */}
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
							onChange={handleCryptoChange}
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
							onChange={handleAddressChange}
							placeholder="Enter your wallet address"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Amount (Display Only) */}
					<div>
						<label
							htmlFor="amount"
							className="block text-sm font-medium text-gray-700"
						>
							Total Amount (in USD)
						</label>
						<div className="mt-1 block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
							${subtotal.toFixed(2)}
						</div>
					</div>

					{/* Payment Confirmation */}
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
							placeholder="Enter your transaction hash"
							className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Submit Button */}
					<div className="mt-6">
						<button
							type="button"
							onClick={handlePayment}
							className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Confirm Payment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CryptoPaymentPage;
