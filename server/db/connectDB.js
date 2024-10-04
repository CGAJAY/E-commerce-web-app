import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const dbURI = process.env.MONGO_URI;
console.log("MongoDB URI:", dbURI); // Add this line before mongoose.connect

// Function to establish a connection to the database
const connectDB = async () => {
	try {
		// asynchronously connect to MongoDB using Mongoose
		await mongoose.connect(dbURI);
		// log success message when connected
		console.log("MongoDB connected successfully");
	} catch (error) {
		// log error if connection fails
		console.error(
			"Error connecting to MongoDB:",
			error.message
		);
		// exit the process if there's an error
		process.exit(1);
	}
};

// Export the connectDB and Models
export { connectDB };
