import { useState } from "react";
import { Link } from "react-router-dom";
import {
	FaBars,
	FaSearch,
	FaShoppingBag,
	FaUser,
	FaTimes,
} from "react-icons/fa";
import useCartStore from "../store/useCartStore";

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const cart = useCartStore((state) => state.cart); // Access cart items from Zustand

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleSearch = () => {
		setIsSearchOpen(!isSearchOpen);
	};

	const categories = [
		"phones",
		"Laptops",
		"Headphones",
		"Smartwatches",
	];
	return (
		<header className="bg-white text-black border-b-2 sticky top-0 z-10">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Hamburger menu for tablet and mobile layouts */}
					<button
						onClick={toggleMenu}
						className="lg:hidden"
					>
						<FaBars className="h-6 w-6" />
					</button>

					{/* Logo */}
					<div className="flex items-center flex-shrink-0 absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 lg:mr-6">
						<Link
							to="/"
							className="font-semibold text-xl tracking-tight"
						>
							E-shop
						</Link>
					</div>

					{/* Categories for Desktop layout */}
					<nav className="hidden lg:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
						{categories.map((category) => (
							<a
								key={category}
								href="#"
								className="text-2xl"
							>
								{category}
							</a>
						))}
					</nav>

					{/* Account and Cart for all layouts */}
					<div className="flex items-center space-x-4">
						<button onClick={toggleSearch} className="">
							<FaSearch className="h-5 w-5" />
						</button>
						<Link to="/profile" className="">
							<FaUser className="h-5 w-5" />
						</Link>

						{/* Cart Icon with Item Count Badge */}
						<Link to="/cart" className="relative">
							<FaShoppingBag className="h-5 w-5" />

							<span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-blue-500 rounded-full">
								{cart.length}
							</span>
						</Link>
						{/* <a href="#" className="hover:text-yellow-500">
							Login / Sign Up
						</a> */}
					</div>
				</div>
			</div>

			{/* Input for search when search icon is clicked*/}
			{isSearchOpen && (
				<div className=" p-4  bg-gray-200">
					<form className="flex items-center">
						<input
							type="text"
							placeholder="Search for products"
							name=""
							id=""
							className="flex-grow p-2 rounded-l-md focus:outline-1 text-black"
						/>
						<button
							type="submit"
							className="bg-black text-white p-2 rounded-r-md"
						>
							Search
						</button>
					</form>
				</div>
			)}

			{/* Menu for Categories in mobile and tablet view */}
			<div
				className={`fixed inset-x-0 top-0 z-50 bg-white transform ${
					isMenuOpen ? "translate-y-0" : "-translate-y-full"
				} transition-transform duration-300 ease-in-out lg:hidden`}
			>
				<div className="cpx-4 py-4">
					<div className="flex justify-between items-center mb-4 border-b-2 pb-2 px-5">
						<span className="font-semibold text-2xl">
							Categories
						</span>
						<button
							onClick={closeMenu}
							className="text-black"
						>
							<FaTimes className="h-6 w-6" />
						</button>
					</div>
					<nav className="flex flex-col space-y-2 items-center">
						{categories.map((category) => (
							<a
								key={category}
								href="#"
								className="text-black text-2xl py-2 px-4"
								onClick={closeMenu}
							>
								{category}
							</a>
						))}
					</nav>
				</div>
			</div>

			{/* Open the menu in mobile and tablet when isMenuOpen is true */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
					onClick={closeMenu}
				></div>
			)}
		</header>
	);
};

export default Header;
