import mongoose from "mongoose";

// Schema to track the user's cart containing products they want to purchase
const CartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Each cart is associated with a specific user
		required: true,
	},
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product", // Refers to the Product model
			},
			quantity: {
				type: Number,
				required: true, // Quantity of each product in the cart
				default: 1,
			},
		},
	],
	totalPrice: {
		type: Number,
		default: 0, // Total price of all products in the cart
	},
});

const Cart = mongoose.model("Cart", CartSchema);
