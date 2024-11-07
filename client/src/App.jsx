import React from "react";
import "@fontsource/roboto";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ItemsCard from "./components/ItemsCard";
import Footer from "./components/Footer";

const App = () => {
	return (
		<>
			<Header />
			<Carousel />
			<ItemsCard />
			<Footer />
		</>
	);
};

export default App;
