import Order from "../db/models/order.js";

// function to add items to cart
// function to add items to cart
export const addToCart = async (req, res) => {
	const { products } = req.body;
	const userId = req.userId;

	console.log(products);

	if (!products || !Array.isArray(products)) {
		return res
			.status(400)
			.json({ error: "Invalid products data" });
	}

	try {
		if (!userId) {
			// Guest user
			return res
				.status(200)
				.json({ message: "store in localStorage" });
		}

		// If user is logged in check if he has an order with status of Cart
		let isExistingCart = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		if (!isExistingCart) {
			// if no cart exist create a new one
			let newCart = await Order.create({
				user: userId,
				products: products.map(({ _id, quantity }) => ({
					product: _id,
					quantity,
				})),
				totalPrice: 0,
				status: "Cart",
			});

			await newCart.save();
		} else {
			let productIndex;
			// If cart exists, update it with the new products
			for (const { _id, quantity } of products) {
				// Find the index of the product in the existing cart
				productIndex = isExistingCart.products.findIndex(
					(item) => item.product.toString() === _id
				);
				// findIndex returns The index of the product if it exists and -1 if the product is not found.
				if (productIndex >= 0) {
					// update quantity
					console.log(
						typeof isExistingCart.products[productIndex]
							.quantity
					);
					isExistingCart.products[productIndex].quantity +=
						parseInt(products[productIndex].quantity);
				} else {
					// If the product does not exist, add it to the cart
					isExistingCart.products.push({
						product: _id,
						quantity,
					});
				}
				// Save the updated order
				await isExistingCart.save();
			}
		}
		let myCart = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		res.status(200).json(myCart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
export const syncCart = async (req, res) => {
	const { products } = req.body; // Expect an array of products
	const userId = req.userId;
	console.log(products);

	try {
		if (!products || !Array.isArray(products)) {
			return res
				.status(400)
				.json({ error: "Invalid products data" });
		}

		if (!userId) {
			// Guest user
			return res
				.status(200)
				.json({ message: "store in localStorage" });
		}

		// If user is logged in check if he has an order with status of Cart
		let isExistingCart = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		if (!isExistingCart) {
			// if no cart exist create a new one
			let newCart = await Order.create({
				user: userId,
				products: products.map(({ _id, quantity }) => ({
					product: _id,
					quantity,
				})),
				totalPrice: 0,
				status: "Cart",
			});

			await newCart.save();
		} else {
			let productIndex;
			// If cart exists, update it with the new products
			for (const { _id, quantity } of products) {
				// Find the index of the product in the existing cart
				productIndex = isExistingCart.products.findIndex(
					(item) => item.product.toString() === _id
				);
				// findIndex returns The index of the product if it exists and -1 if the product is not found.
				if (productIndex >= 0) {
					// update quantity
					console.log(
						typeof isExistingCart.products[productIndex]
							.quantity
					);
					isExistingCart.products[productIndex].quantity +=
						parseInt(products[productIndex].quantity);
				} else {
					// If the product does not exist, add it to the cart
					isExistingCart.products.push({
						product: _id,
						quantity,
					});
				}
				// Save the updated order
				await isExistingCart.save();
			}
		}
		let myCart = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		res.status(200).json(myCart);
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
			return res
				.status(404)
				.json({ message: "No items in the cart" }); // Empty cart
		}

		res.status(200).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
