import express from "express";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

const app = express();

const PORT = process.env.PORT | 3000;

app.get("/", (req, res) => {
	res.status(200).send("Hello world");
});

app.listen(PORT, () => {
	console.log("hello");
});
