import { create } from "zustand";

const useAuthStore = create((set) => ({
	// null when logged out
	user: {
		firstName: "John",
		lastName: "Doe",
		username: "jdoe",
		email: "john.doe@example.com",
		address: {
			street: "123 Main St",
			city: "Anytown",
			zip: "12345",
		},
	},
	login: (userData) => set({ user: userData }),
	logout: () => set({ user: null }),
}));

export default useAuthStore;
