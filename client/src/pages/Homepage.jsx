import React from "react";
import Carousel from "../components/Carousel";
import ItemsCard from "../components/ItemsCard";
import useAuthStore from "../store/useAuthStore";

const HomePage = () => {
	// Access user state
	const { user, isAuthenticated } = useAuthStore(
		(state) => state
	);

	// Render a different UI if the user is an admin
	if (isAuthenticated && user?.role === "admin") {
		return (
			<div>
				<h1>Welcome Admin!</h1>
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
