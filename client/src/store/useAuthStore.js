import { create } from "zustand";
// import useCartStore from "./useCartStore";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// State to manage user info and authentication status
const useAuthStore = create((set) => ({
	user: null, // Default is no user is logged in
	isAuthenticated: false, // Default is not authenticated
	// Load user from cookie
	loadUser: async () => {
		try {
			const response = await fetch(
				`${backendUrl}/api/v1/auth/verify`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);
			if (response.ok) {
				const data = await response.json();
				set({ user: data, isAuthenticated: true });
				console.log(data);
			} else {
				set({ user: null, isAuthenticated: false });
				// console.log(data);
			}
		} catch (error) {
			console.error("Error loading user", error);
			set({ user: null, isAuthenticated: false });
		}
	},
	// function that accepts userData
	login: (userData) => {
		set({ user: userData, isAuthenticated: true });
		// Sync the cart to the database after successful login
		// useCartStore.getState().syncCartToDatabase();
	},
	// function that clears the user state by setting it to null
	logout: () => set({ user: null, isAuthenticated: false }),

	// Function to update the user's profile photo
	updateProfilePhoto: (photoUrl) =>
		set((state) => ({
			user: { ...state.user, profilePhoto: photoUrl },
		})),
}));

export default useAuthStore;
