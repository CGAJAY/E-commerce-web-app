import React from "react";
import "@fontsource/roboto";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ItemsCard from "./components/ ItemsCard";

const App = () => {
	return (
		<>
			<Header />
			<Carousel />
			<ItemsCard />
		</>
	);
};

export default App;
