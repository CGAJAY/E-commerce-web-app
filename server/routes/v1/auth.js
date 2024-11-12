import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../../controllers/auth.js";
import {
	validateUserRegistration,
	validateLogin,
} from "../../Middlewares/userValidator.js";
import { verifyUser } from "../../Middlewares/auth.js";

const authRouter = Router();

// /api/v1/auth/register
authRouter.post(
	"/register",
	validateUserRegistration,
	registerUser
);

// /api/v1/auth/login
authRouter.post("/login", validateLogin, loginUser);

// /api/v1/auth/logout
authRouter.delete("/logout", logoutUser);

authRouter.get("/verify", verifyUser);

export { authRouter };
