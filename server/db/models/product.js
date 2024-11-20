import { Schema, model } from "mongoose";

// Product Schema
const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
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
		description: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String, // Stores the file path or URL
			required: true,
		},
	},
	{ timestamps: true } // Enable timestamps
);

const Product = model("Product", productSchema);
export default Product;
