// import { create } from "zustand";

// const useAuthStore = create((set) => ({
// 	// null when logged out
// 	user:
// 		// {
// 		// firstName: "John",
// 		// lastName: "Doe",
// 		// username: "jdoe",
// 		// email: "john.doe@example.com",
// 		// },
// 		null,
// 	login: (userData) => set({ user: userData }),
// 	logout: () => set({ user: null }),
// }));

// export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: null,
	login: (userData) => set({ user: userData }), // Store user info
	logout: () => set({ user: null }), // Logout user (clear state)
	initialize: () => {
		// Check if the user is already logged in on page load (using cookie)
		const storedUser = localStorage.getItem("user");

		if (storedUser) {
			set({ user: JSON.parse(storedUser) });
		}
	},
}));

export default useAuthStore;
