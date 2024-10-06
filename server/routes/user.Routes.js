import express from "express";
import {
	registerUser,
	loginUser,
	deleteUser,
} from "../controllers/user.controller.js";
// import {
// 	protectRoute,
// 	adminOnly,
// } from "../middleware/authMiddleware.js"; // middleware for authentication

const userRoutes = express.Router();

// POST /api/users/register - Register a new user
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.delete("/:id", deleteUser);

// // POST /api/users/login - Authenticate user (Login)
// userRoutes.post("/login", loginUser);

// // GET /api/users/profile - Get logged-in user's profile
// userRoutes.get("/profile", protectRoute, getUserProfile);

// // PUT /api/users/profile - Update logged-in user's profile
// userRoutes.put("/profile", protectRoute, updateUserProfile);

// // DELETE /api/users/:id - Delete a user by admin (or by user themselves)
// userRoutes.delete(
// 	"/:id",
// 	protectRoute,
// 	adminOnly,
// 	deleteUser
// );

export default userRoutes;
