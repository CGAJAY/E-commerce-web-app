import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For hashing passwords

// User Schema
const userSchema = new mongoose.Schema(
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
		role: {
			type: String,
			enum: ["customer", "admin"], // Only allow 'customer' or 'admin' roles
			default: "customer", // Default role is set to 'customer'
		},
		cart: [],
	},
	{ timestamps: true } // Enable timestamps
);

// Pre-save middleware to hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) {
		return next();
	}

	// Generate salt
	const salt = await bcrypt.genSalt(10);
	// Hash the password using bcrypt
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

// Method to check if entered password matches the hashed password in the database
userSchema.methods.matchPassword = async function (
	enteredPassword
) {
	return await bcrypt.compare(
		enteredPassword,
		this.password
	);
};

const User = mongoose.model("User", userSchema);
export default User;
