import React from "react";
import "@fontsource/roboto";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";

const App = () => {
	return (
		<Router future={{ v7_relativeSplatPath: true }}>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
