import { Router } from "express";
import { verifyUserCart } from "../../Middlewares/order.js";
import {
	addToCart,
	getCart,
} from "../../controllers/order.js";

const cartRouter = Router();

cartRouter.post("/add", verifyUserCart, addToCart);
cartRouter.get("/", verifyUserCart, getCart);

export { cartRouter };
