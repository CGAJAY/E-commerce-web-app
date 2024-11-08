import React from "react";
import "@fontsource/roboto";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
