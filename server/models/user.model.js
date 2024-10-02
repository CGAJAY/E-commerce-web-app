import mongoose from "mongoose";

// User Schema
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
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
});

const User = mongoose.model("User", userSchema);
export default User;
