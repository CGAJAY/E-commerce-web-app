import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category", // Reference to the Category model
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true } // Enable timestamps
);

const Product = mongoose.model("Product", productSchema);
export default Product;
