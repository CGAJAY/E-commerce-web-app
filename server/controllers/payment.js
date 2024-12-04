export const payment = async (req, res) => {
	const {
		cryptoType,
		walletAddress,
		amount,
		transactionHash,
	} = req.body;
	try {
		return res.status(200).json({
			message: "Payment processed successfully.",
			paymentDetails: {
				cryptoType,
				walletAddress,
				amount,
				transactionHash,
			},
		});
	} catch (error) {
		console.error(
			"Payment processing error:",
			error.message
		);
		return res.status(500).json({
			message:
				"An error occurred while processing the payment.",
		});
	}
};
