import { create } from "zustand";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const useAuthStore = create((set) => ({
	// set to null, meaning no one is logged in by default.
	user: null,
	isAuthenticated: false,
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
				console.log(data);
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

	// Function to update the user's profile photo
	updateProfilePhoto: (photoUrl) =>
		set((state) => ({
			user: { ...state.user, profilePhoto: photoUrl },
		})),
}));

export default useAuthStore;
