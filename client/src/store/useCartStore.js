import { create } from "zustand";

// Zustand store for managing the shopping cart
const useCartStore = create((set, get) => ({
	// Initial state: An empty cart
	cart: [],

	// Function to add an item to the cart
	addToCart: (item) => {
		// Check if the item already exists in the cart
		const existingItem = get().cart.find(
			(cartItem) => cartItem._id === item._id
		);

		let updatedCart;
		if (existingItem) {
			// If the item exists, increment its quantity
			updatedCart = get().cart.map((cartItem) =>
				cartItem._id === item._id
					? {
							...cartItem,
							quantity: cartItem.quantity + 1,
					  }
					: cartItem
			);
		} else {
			// If the item doesn't exist, add it to the cart with a quantity of 1
			updatedCart = [
				...get().cart,
				{ ...item, quantity: 1 },
			];
		}

		// update the cart state with the new or updated item
		set({ cart: updatedCart });

		// Save the updated cart to localStorage for persistence
		localStorage.setItem(
			"cart",
			JSON.stringify(updatedCart)
		);
		console.log(
			"Cart Updated:",
			JSON.stringify(updatedCart)
		);
	},
	loadCart: () => {
		const storedCart = localStorage.getItem("cart");
		if (storedCart) {
			set({ cart: JSON.parse(storedCart) });
		}
	},
}));

export default useCartStore;
