import Order from "../db/models/order.js";
import Product from "../db/models/product.js";

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

		let totalPrice = 0;

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

			// Fetch products and calculate total price
			const productIds = products.map(
				(product) => product._id
			);
			const fetchedProducts = await Product.find({
				_id: { $in: productIds },
			});

			totalPrice = fetchedProducts.reduce(
				(total, product) => {
					const cartItem = products.find(
						(item) => item._id === product._id
					);
					return total + product.price * cartItem.quantity;
				},
				0
			);

			newCart.totalPrice = totalPrice;

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
					console.log(quantity);
					isExistingCart.products[productIndex].quantity +=
						parseInt(quantity);
				} else {
					// If the product does not exist, add it to the cart
					isExistingCart.products.push({
						product: _id,
						quantity,
					});
				}

				// Calculate the total price
				const productIds = isExistingCart.products.map(
					(item) => item.product
				);
				const fetchedProducts = await Product.find({
					_id: { $in: productIds },
				});

				totalPrice = fetchedProducts.reduce(
					(total, product) => {
						const cartItem = isExistingCart.products.find(
							(item) =>
								item.product.toString() ===
								product._id.toString()
						);
						return (
							total + product.price * cartItem.quantity
						);
					},
					0
				);

				isExistingCart.totalPrice = totalPrice;

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

	if (!products || !Array.isArray(products)) {
		return res
			.status(400)
			.json({ error: "Invalid products data" });
	}

	try {
		let totalPrice = 0; // Declare totalPrice at the start

		if (!userId) {
			// Guest user
			return res
				.status(200)
				.json({ message: "store in localStorage" });
		}

		let isExistingCart = await Order.findOne({
			user: userId,
			status: "Cart",
		});

		if (!isExistingCart) {
			// If no cart exists, create a new one
			let newCart = await Order.create({
				user: userId,
				products: products.map(({ _id, quantity }) => ({
					product: _id,
					quantity,
				})),
				totalPrice: 0, // Initialize total price
				status: "Cart",
			});

			// Fetch product details and calculate total price
			// const productIds = products.map(
			// 	(product) => product._id
			// );
			// const fetchedProducts = await Product.find({
			// 	_id: { $in: productIds },
			// });

			// totalPrice = fetchedProducts.reduce(
			// 	(total, product) => {
			// 		const cartItem = products.find(
			// 			(item) => item._id === product._id
			// 		);
			// 		return total + product.price * cartItem.quantity;
			// 	},
			// 	0
			// );

			// newCart.totalPrice = totalPrice;
			await newCart.save();

			return res.status(200).json(newCart);
		} else {
			// Update the existing cart with new products
			for (const { _id, quantity } of products) {
				const productIndex =
					isExistingCart.products.findIndex(
						(item) => item.product.toString() === _id
					);

				if (productIndex >= 0) {
					// Update quantity
					isExistingCart.products[productIndex].quantity +=
						parseInt(quantity);
				} else {
					// Add new product to the cart
					isExistingCart.products.push({
						product: _id,
						quantity,
					});
				}
			}

			// Calculate total price after updating cart
			const productIds = isExistingCart.products.map(
				(item) => item.product
			);
			const fetchedProducts = await Product.find({
				_id: { $in: productIds },
			});

			totalPrice = fetchedProducts.reduce(
				(total, product) => {
					const cartItem = isExistingCart.products.find(
						(item) =>
							item.product.toString() ===
							product._id.toString()
					);
					if (cartItem) {
						return (
							total + product.price * cartItem.quantity
						);
					}
					return total;
				},
				0
			);

			isExistingCart.totalPrice = totalPrice;
			await isExistingCart.save();
		}

		res.status(200).json({
			message: "Cart successfully synchronized",
			data: isExistingCart,
		});
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

		// Calculate total price for the cart
		const totalPrice = order.products.reduce(
			(total, item) => {
				return total + item.product.price * item.quantity;
			},
			0
		);

		// Map the response to match the expected structure
		const cart = order.products.map((item) => ({
			_id: item.product._id,
			name: item.product.name,
			description: item.product.description,
			price: item.product.price,
			image: item.product.image,
			quantity: item.quantity,
		}));

		res.status(200).json({ cart, totalPrice });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const getProductsDetails = async (req, res) => {
	const { productIds } = req.body;
	console.log(productIds);

	if (!productIds || !Array.isArray(productIds)) {
		return res
			.status(400)
			.json({ error: "Invalid product IDs" });
	}

	try {
		const products = await Product.find({
			_id: { $in: productIds },
		});

		if (!products.length) {
			return res
				.status(404)
				.json({ message: "No products found" });
		}
		console.log(products);

		// Format the response to match the cart structure
		const cart = products.map((product) => ({
			_id: product._id,
			name: product.name,
			description: product.description,
			price: product.price,
			image: product.image,
			quantity: 1, // Default quantity for guest users
		}));

		res.status(200).json({ cart });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
