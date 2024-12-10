import { Router } from "express";
import { verifyUserCart } from "../../Middlewares/order.js";
import {
	addToCart,
	getCart,
	getProductsDetails,
	syncCart,
} from "../../controllers/order.js";

const cartRouter = Router();

cartRouter.post("/add", verifyUserCart, addToCart);
cartRouter.post("/sync-cart", verifyUserCart, syncCart);
cartRouter.post("/products/details", getProductsDetails);
cartRouter.get("/", verifyUserCart, getCart);

export { cartRouter };
