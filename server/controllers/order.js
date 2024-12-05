import Order from "../db/models/order.js";

// function to add items to cart
// function to add items to cart
export const addToCart = async (req, res) => {
	const { productId, quantity } = req.body;
	const userId = req.userId;
	console.log(req.userId);
	console.log(userId);

	try {
		if (!userId) {
			// Guest user
			return res
				.status(200)
				.json({ message: "store in localStorage" });
		}

		// If user is logged in check if he has an order with status of Cart
		let order = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		if (!order) {
			// if no cart exist create a new one
			order = await Order.create({
				user: userId,
				products: [{ product: productId, quantity }],
				totalPrice: 0,
				status: "Cart",
			});
		} else {
			// If cart exist, check if product is already in the cart
			// The findIndex() is used to locate the index of a product in the products array
			const productIndex = order.products.findIndex(
				// ObjectId is a special type in MongoDB, so it must be converted to a string to compare it with the string productId.
				(item) => item.product.toString() === productId
			);

			// findIndex returns The index of the product if it exists and -1 if the product is not found.
			if (productIndex >= 0) {
				// update quantity
				order.products[productIndex].quantity += quantity;
			} else {
				// Add a new product
				order.products.push({
					product: productId,
					quantity,
				});
			}
		}
		res.status(200).json({
			message: "Product added to cart successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
export const syncCart = async (req, res) => {
	const { cart } = req.body; // Expect an array of products
	const userId = req.userId;
	console.log(cart);

	try {
		// Check if the user already has a cart saved in the database
		let existingOrder = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		if (!existingOrder) {
			// If no cart exists, create a new order with the provided cart items
			existingOrder = new Order({
				user: userId,
				status: "Cart",
				products: [],
			});
		}

		// Map the incoming cart items to the existing order's products
		cart.forEach((item) => {
			const existingProduct = existingOrder.products.find(
				(p) => p.product.toString() === item.productId
			);

			if (existingProduct) {
				// If the product already exists, update its quantity
				existingProduct.quantity += item.quantity;
			} else {
				// If the product is new, add it to the cart
				existingOrder.products.push({
					product: mongoose.Types.ObjectId(item.productId),
					quantity: item.quantity,
				});
			}
		});

		// Save the updated or new order in the database
		await existingOrder.save();

		// Fetch the complete cart details to return to the frontend
		const populatedCart = await Order.findOne({
			user: userId,
			status: "Cart",
		}).populate("products.product");

		// Return the updated cart
		res.status(200).json({ cart: populatedCart.products });
	} catch (error) {
		console.error("Error syncing cart:", error);
		res.status(500).json({ error: "Failed to sync cart" });
	}
};

export const getCart = async (req, res) => {
	const userId = req.userId;

	try {
		if (!userId) {
			return res.status(200).json({ cart: [] }); // No cart for guest users
		}
		const order = await Order.findOne({
			user: userId,
			status: "Cart",
		}).populate("products.product");

		if (!order) {
			return res.status(200).json({ cart: [] }); // Empty cart
		}

		res.status(200).json({ cart: order.products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
