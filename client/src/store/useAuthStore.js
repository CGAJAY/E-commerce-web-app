import { create } from "zustand";

const useAuthStore = create((set) => ({
	// set to null, meaning no one is logged in by default.
	user: null,
	// function that accepts userData
	login: (userData) => set({ user: userData }),
	// function that clears the user state by setting it to null
	logout: () => set({ user: null }), // Logout user (clear state)
}));

export default useAuthStore;
