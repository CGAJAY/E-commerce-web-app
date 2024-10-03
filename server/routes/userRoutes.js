import express from "express";
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
	deleteUser,
} from "../controllers/userController.js";
import {
	protectRoute,
	adminOnly,
} from "../middleware/authMiddleware.js"; // Assuming you'll have middleware for authentication

const router = express.Router();

// POST /api/users/register - Register a new user
router.post("/register", registerUser);

// POST /api/users/login - Authenticate user (Login)
router.post("/login", loginUser);

// GET /api/users/profile - Get logged-in user's profile
router.get("/profile", protectRoute, getUserProfile);

// PUT /api/users/profile - Update logged-in user's profile
router.put("/profile", protectRoute, updateUserProfile);

// DELETE /api/users/:id - Delete a user by admin (or by user themselves)
router.delete("/:id", protectRoute, adminOnly, deleteUser);

export default router;
