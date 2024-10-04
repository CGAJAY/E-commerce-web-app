import express from "express";
import { configDotenv } from "dotenv";
import userRoutes from "./models/routes/user.Routes.js"; // Import user routes
// Import the database connection function
import { connectDB } from "./db/connectDB.js";

configDotenv(); // Load environment variables

const app = express(); // Create an Express application
connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON request bodies

const PORT = process.env.PORT | 3000;

// Use user routes for all user-related endpoints
app.use("/", userRoutes);

app.listen(PORT, () => {
	console.log("hello");
});
