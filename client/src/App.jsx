import React, { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import useCartStore from "./store/useCartStore";
import "@fontsource/roboto";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerification from "./pages/EmailVerification";

import CryptoPaymentPage from "./pages/CryptoPaymentPage";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Outlet,
} from "react-router-dom";

const App = () => {
	const loadUser = useAuthStore((state) => state.loadUser);
	const loadCart = useCartStore((state) => state.loadCart);

	useEffect(() => {
		loadCart(); // Load cart from localStorage
	}, []);

	useEffect(() => {
		loadUser(); // Loads user if valid session cookie is found
	}, [loadUser]);
	return (
		<Router future={{ v7_relativeSplatPath: true }}>
			<Routes>
				{/* Routes with Header and Footer */}
				<Route element={<LayoutWithHeaderFooter />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route
						path="/profile"
						element={<ProfilePage />}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
				</Route>

				{/* Routes without header and footer  */}
				<Route
					path="/confirm-email"
					element={<EmailVerification />}
				/>
				<Route
					path="payment"
					element={<CryptoPaymentPage />}
				/>
			</Routes>
		</Router>
	);
};

function LayoutWithHeaderFooter() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
