import mongoose from "mongoose";

// Order Item Schema (similar to cart item)
const orderItemSchema = new mongoose.Schema(
	{
		productId: {
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
	{ timestamps: true } // Enable timestamps
);

// Order Schema
const orderSchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User", // Refers to User collection
		required: true,
	},
	products: [orderItemSchema], // Array of ordered products
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
		default: "Pending", // Order status (e.g., Pending, Shipped, Delivered)
	},
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
