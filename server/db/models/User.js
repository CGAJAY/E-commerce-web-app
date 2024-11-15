import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			street: String,
			city: String,
			zip: String,
		},
		verificationCode: {
			type: Number,
		},
		verificationCodeExpiresAt: {
			type: Date,
		},
		isVerified: {
			type: Boolean,
			default: false, // User is not confirmed by default
		},
		role: {
			type: String,
			enum: ["customer", "admin"], // Only allow 'customer' or 'admin' roles
			default: "customer", // Default role is set to 'customer'
		},
		cart: [],
	},
	{ timestamps: true } // Enable timestamps
);

const User = model("User", userSchema);
export default User;
