import { Schema, model } from "mongoose";

// Order Schema
const orderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User", // Refers to User collection
		required: true,
	},
	products: [
		{
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product", // Refers to Product collection
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				default: 1,
			},
		},
	], // Array of ordered products
	totalPrice: {
		type: Number,
		required: true,
	},
	orderDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: [
			"Cart", // For a cart saved but not ordered yet
			"Pending", // When user starts the checkout process
			"Paid", // When user makes payment
			"Shipping", // When the product is being delivered
			"Delivered", // When product has reached the customer
			"Cancelled", // If the order is cancelled at any stage
		],
		default: "Cart",
	},
});

const Order = model("Order", orderSchema);
export default Order;
