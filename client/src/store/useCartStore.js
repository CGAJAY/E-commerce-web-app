import { create } from "zustand";
import useAuthStore from "./useAuthStore";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Zustand store for managing the shopping cart
const useCartStore = create((set, get) => ({
	// Initial state: An empty cart
	cart: [],

	// Function to add an item to the cart
	addToCart: async (item) => {
		// Get the user's authentication status and details from the auth store
		const { isAuthenticated } = useAuthStore.getState();

		// Get the current cart state
		const currentCart = get().cart;

		console.log({ currentCart });

		// Check if the item already exists in the cart
		const existingItem = currentCart.find(
			(cartItem) => cartItem._id === item._id
		);

		let updatedCart;
		if (existingItem) {
			// If the item is already in the cart, increase its quantity
			updatedCart = currentCart.map((cartItem) =>
				cartItem._id === item._id
					? {
							...cartItem,
							quantity: cartItem.quantity + 1,
					  }
					: cartItem
			);
		} else {
			// If the item is not in the cart, add it with a quantity of 1
			updatedCart = [
				...currentCart,
				{ _id: item._id, quantity: 1 },
			];
		}

		// update the cart state with the new or updated item
		set({ cart: updatedCart });

		if (isAuthenticated) {
			// if user is logged in, save the cart to the database
			try {
				// Directly fetch the cart from the store
				const cart = get().cart;
				console.log(
					"Cart for saving:",
					JSON.stringify(cart, null, 2)
				);

				const response = await fetch(
					`${backendUrl}/api/v1/cart/add`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						credentials: "include",
						// Convert cart data to JSON
						body: JSON.stringify({
							products: [
								{
									_id: item._id,
									quantity: 1,
								},
							],
						}),
					}
				);

				if (!response.ok) {
					throw new Error("Failed to add items to cart");
				}
				console.log("Cart successfully saved.");
			} catch (error) {
				// Log any errors
				console.error(
					"Error updating cart in the database:",
					error
				);
			}
		} else {
			// If the user is not logged in
			// Directly fetch the cart from the store
			const cart = get().cart;
			// save the cart to localStorage
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	},

	// Function to load the cart when the app starts
	loadCart: async () => {
		// Get the user's authentication status and details from the auth store
		const { isAuthenticated } = useAuthStore.getState();
		if (isAuthenticated) {
			// If the user is logged in, fetch the cart from the database
			try {
				const response = await fetch(
					`${backendUrl}/api/v1/cart`,
					{
						method: "GET", // Use GET to retrieve data from the server
						headers: { "Content-Type": "application/json" },
						credentials: "include",
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch the cart");
				}
				// Parse the response as JSON
				const data = await response.json();
				console.log({ loadCartData: data });

				// Transform the API response to only include product._id and quantity
				const minimalCart = data.cart.map((item) => ({
					// Extract _id from the nested product object
					_id: item._id,
					// Extract quantity directly
					quantity: item.quantity,
				}));

				// Save the minimalCart to the store
				set({ cart: minimalCart });
				console.log("Cart loaded and saved", get().cart);
			} catch (error) {
				// Log errors
				console.error(
					"Error fetching cart from database:",
					error
				);
			}
		} else {
			// If the user is not logged in, load the cart from localStorage
			const storedCart = localStorage.getItem("cart");
			if (storedCart) {
				// Parse the cart data from JSON and update state
				set({ cart: JSON.parse(storedCart) });
			}
			console.log("Cart loaded and saved", get().cart);
		}
	},

	// Function to sync loacalStorage with database when the user logs in
	syncCartToDatabase: async () => {
		// Get user's authentication status from auth store
		const { isAuthenticated } = useAuthStore.getState();

		if (isAuthenticated) {
			// Check for a stored cart in localStorage
			const storedCart = localStorage.getItem("cart");

			if (storedCart && storedCart.length > 0) {
				// parse the cart data
				const cart = JSON.parse(storedCart);
				console.log("Parsed cart:", cart);

				try {
					// Send the cart data to the backend to sync
					const response = await fetch(
						`${backendUrl}/api/v1/cart/sync-cart`,
						{
							method: "POST",
							headers: {
								"Content-type": "application/json",
							},
							credentials: "include",
							body: JSON.stringify({ products: cart }),
						}
					);

					// Log response status for debugging
					console.log(
						"Sync cart response status:",
						response.status
					);

					if (!response.ok) {
						throw new Error(
							"Failed to sync cart with the database"
						);
					}

					const data = await response.json();
					console.log(
						"Cart successfully synchronized",
						data
					);

					set({ cart: data.products });

					// Clear localStorage after successful sync
					localStorage.removeItem("cart");
				} catch (error) {
					console.log(
						"Error syncing cart to database:",
						error
					);
				}
			} else {
				console.log("No cart in localStorage to sync.");
			}
		} else {
			console.log(
				"User is not authenticated, skipping cart sync."
			);
		}
	},

	clearCart: async () => {
		set({ cart: [] });
	},
}));

export default useCartStore;
