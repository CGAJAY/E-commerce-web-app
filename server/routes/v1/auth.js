import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	verifyEmail,
	resendCode,
	verifyUser,
} from "../../controllers/auth.js";
import {
	validateUserRegistration,
	validateLogin,
} from "../../Middlewares/userValidator.js";
import { singleFileUpload } from "../../multer/singleFileUpload.js";
import { requiresAuthentication } from "../../Middlewares/auth.js";

const authRouter = Router();

// /api/v1/auth/register
authRouter.post(
	"/register",
	validateUserRegistration,
	registerUser
);

// /api/v1/auth/verify-email
authRouter.post("/verify-email", verifyEmail);

// /api/v1/auth/resend-code
authRouter.post("/resend-code", resendCode);

// /api/v1/auth/login
authRouter.post("/login", validateLogin, loginUser);

// /api/v1/auth/verify
authRouter.get("/verify", verifyUser);

// /api/v1/auth/logout
authRouter.delete("/logout", logoutUser);

authRouter.post(
	"/upload-photo",
	requiresAuthentication,
	singleFileUpload
);

export { authRouter };
