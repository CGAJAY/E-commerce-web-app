import { Router } from "express";

import { requiresAuthentication } from "../../Middlewares/auth.js";

// router imports
import { authRouter } from "./auth.js";
import { categoryRouter } from "./category.js";
import { productRouter } from "./product.js";
import { cartRouter } from "./cart.js";

const v1Router = Router();

// PUBLIC ROUTES (don't require a user to be logged in inorder to access them)
// /api/v1

v1Router.get("/", (req, res) => {
	res.json({
		message: "Hello from v1",
	});
});

// api/v1/auth
v1Router.use("/auth", authRouter);
v1Router.use("/category", categoryRouter);
v1Router.use("/products", productRouter);
v1Router.use("/cart", cartRouter);

export { v1Router };
