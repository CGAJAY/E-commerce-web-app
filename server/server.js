import express from "express";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables

const app = express();
const PORT = process.env.PORT | 3005;

app.use("/", (req, res) => {
	res.status(200).send("Amazon loading");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
