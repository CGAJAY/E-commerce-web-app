// store.js
import { create } from "zustand";

const useCartStore = create((set) => ({
	cartItems: [
		{
			id: 3,
			imageUrl:
				"https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			name: "Wireless Headphones",
			description:
				"High-quality sound with long battery life",
			price: 79.99,
			quantity: 2,
		},
	],
	addToCart: (item) =>
		set((state) => ({
			cartItems: [...state.cartItems, item],
		})),
	removeFromCart: (id) =>
		set((state) => ({
			cartItems: state.cartItems.filter(
				(item) => item.id !== id
			),
		})),
	clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
