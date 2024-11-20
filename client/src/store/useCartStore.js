// store.js
import { create } from "zustand";

const useCartStore = create((set) => ({
	cart: [],

	// Add an item to the cart
	addToCart: (item) =>
		set((state) => {
			const existingItem = state.cart.find(
				(cartItem) => cartItem._id === item._id
			);

			if (existingItem) {
				// Increment the quantity if the item already exists
				return {
					cart: state.cart.map((cartItem) =>
						cartItem._id === item._id
							? {
									...cartItem,
									quantity: cartItem.quantity + 1,
							  }
							: cartItem
					),
				};
			}

			// Add the item to the cart with a quantity of 1
			return {
				cart: [...state.cart, { ...item, quantity: 1 }],
			};
		}),
}));

export default useCartStore;
