import { create } from "zustand";

const useAuthStore = create((set) => ({
	// set to null, meaning no one is logged in by default.
	user: null,
	isAuthenticated: false,
	// Load user from cookie
	loadUser: async () => {
		try {
			const response = await fetch(
				"http://localhost:3000/api/v1/auth/verify",
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				}
			);
			if (response.ok) {
				const data = await response.json();
				set({ user: data, isAuthenticated: true });
			} else {
				set({ user: null, isAuthenticated: false });
			}
		} catch {
			set({ user: null, isAuthenticated: false });
		}
	},
	// function that accepts userData
	login: (userData) =>
		set({ user: userData, isAuthenticated: true }),
	// function that clears the user state by setting it to null
	logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
