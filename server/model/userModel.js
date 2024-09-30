import mongoose from "mongoose";

// 1. User Schema
// Schema to store user information including authentication and roles
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true, // Ensures the username is unique for each user
	},
	name: {
		type: String,
		required: true, // Name field is required for the user's full name
	},
	email: {
		type: String,
		required: true,
		unique: true, // Email is unique, used for authentication and communication
	},
	password: {
		type: String,
		required: true, // Password for user authentication, typically hashed
	},
	address: {
		type: String, // Address for profile management
	},
	phoneNumber: {
		type: String, // Optional contact information
	},
	role: {
		type: String,
		enum: ["admin", "customer"], // Limits the role to either 'admin' or 'customer'
		default: "customer", // Default role is 'customer'
	},
	cart: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Cart", // Refers to the Cart model
		},
	],
	orders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order", // Refers to the Order model
		},
	],
});

const User = mongoose.model("User", UserSchema);
