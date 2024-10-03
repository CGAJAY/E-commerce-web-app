import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

// Function to establish a connection to the database
const connectDB = async () => {
	try {
		// asynchronously connect to MongoDB using Mongoose
		await mongoose.connect(process.env.MONGO_URI);
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
