import mongoose from "mongoose";

// Schema for tracking orders made by users
const OrderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Refers to the user who placed the order
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
				required: true, // Quantity of each product ordered
			},
		},
	],
	totalPrice: {
		type: Number,
		required: true, // Total price of the order
	},
	status: {
		type: String,
		default: "pending", // Status of the order: pending, shipped, delivered, etc.
	},
	orderDate: {
		type: Date,
		default: Date.now, // Date when the order was placed
	},
	shippingAddress: {
		type: String,
		required: true, // Shipping address where the order will be delivered
	},
});

const Order = mongoose.model("Order", OrderSchema);
