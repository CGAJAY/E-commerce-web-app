// Middleware function to validate payments details
export const validatePaymentDetails = async (
	req,
	res,
	next
) => {
	const {
		cryptoType,
		walletAddress,
		amount,
		transactionHash,
	} = req.body;
	try {
		// Check for missing fields
		if (!cryptoType) {
			return res.status(400).json({
				message: "Cryptocurrency type is required.",
			});
		}
		if (!walletAddress) {
			return res
				.status(400)
				.json({ message: "Wallet address is required." });
		}
		if (!transactionHash) {
			return res.status(400).json({
				message: "Transaction hash is required.",
			});
		}

		// Amount must be => than 99
		if (!amount || isNaN(amount) || amount < 100) {
			return res.status(400).json({
				message:
					"Amount must be a valid number greater than 99.",
			});
		}

		const supportedCryptos = [
			"ethereum",
			"bitcoin",
			"solana",
		];

		if (!supportedCryptos.includes(cryptoType)) {
			res.status(400).json({
				message: "Unsupported cryptocurrency type.",
			});
		}
		next();
	} catch (error) {
		console.error("Validation error:", error.message);
		res.status(500).json({
			message:
				"An unexpected error occurred during validation.",
		});
	}
};
