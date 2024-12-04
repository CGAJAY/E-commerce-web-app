import React from "react";
import Carousel from "../components/Carousel";
import ItemsCard from "../components/ItemsCard";
import useAuthStore from "../store/useAuthStore";
import AddCategory from "../components/AddCategory";

const HomePage = () => {
	// Access user state
	const { user, isAuthenticated } = useAuthStore(
		(state) => state
	);

	// Render a different UI if the user is an admin
	if (isAuthenticated && user?.role === "admin") {
		return (
			<div>
				<AddCategory />
			</div>
		);
	}
	return (
		<>
			<Carousel />
			<ItemsCard />
		</>
	);
};

export default HomePage;
