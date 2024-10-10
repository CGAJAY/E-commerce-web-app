import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Define the MongoDB URI from the environment variables
const dbURI = process.env.MONGO_URI;
console.log("MongoDB URI:", dbURI);

// Function to establish a connection to the database
const connectDB = async () => {
	try {
		// asynchronously connect to MongoDB using Mongoose
		await connect(dbURI);
		// log success message when connected
		console.log("MongoDB connected successfully");
	} catch (error) {
		// log error if connection fails
		console.error(
			"Error connecting to MongoDB:",
			error.message
		);
		// Exit the process with a failure code (1) to stop the application in case of failure
		process.exit(1);
	}
};

// Export the connectDB and Models
export { connectDB };
