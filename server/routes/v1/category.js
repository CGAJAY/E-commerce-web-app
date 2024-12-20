import { Router } from "express";
import { addCategory } from "../../controllers/category.js";
import { validateNewCategory } from "../../Middlewares/categoryValidator.js";
import {
	isAdmin,
	requiresAuthentication,
} from "../../Middlewares/auth.js";

const categoryRouter = Router();

// /api/v1/category/
categoryRouter.get(
	"/",
	requiresAuthentication,
	(req, res) => {
		res
			.status(201)
			.json({ message: "Category will be added" });
	}
);

// /api/v1/category/add
categoryRouter.post(
	"/add",
	requiresAuthentication,
	isAdmin,
	validateNewCategory,
	addCategory
);

export { categoryRouter };
