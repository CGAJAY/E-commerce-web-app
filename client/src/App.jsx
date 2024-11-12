import React, { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
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
	const loadUser = useAuthStore((state) => state.loadUser);

	useEffect(() => {
		loadUser(); // Loads user if valid session cookie is found
	}, [loadUser]);
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
