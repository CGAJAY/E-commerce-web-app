import express from "express";
import {
	registerUser,
	loginUser,
	deleteUser,
	getProfile,
} from "../controllers/user.controller.js";
// middleware for authentication
import cookieAuth from "../middlewares/cookieAuth.js";
import {
	validateLogin,
	validateUserRegistration,
} from "../Middlewares/userValidator.js";

const userRoutes = express.Router();

// POST /register - Register a new user
userRoutes.post(
	"/register",
	validateUserRegistration,
	registerUser
);
// POST /login - Login a user
userRoutes.post("/login", validateLogin, loginUser);
// DELETE /user/:id - Delete a user
userRoutes.delete("/:id", deleteUser);
// GET /user/profile - Go to user's profile
userRoutes.get("/user/Profile", cookieAuth, getProfile);

export default userRoutes;
