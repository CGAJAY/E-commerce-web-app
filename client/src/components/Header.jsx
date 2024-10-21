import { useState } from "react";
import {
	FaBars,
	FaSearch,
	FaShoppingBag,
	FaUser,
	FaTimes,
} from "react-icons/fa";

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const closeMenu = () => {
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
		<header className="bg-white text-black">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Hamburger menu for tablet and mobile layouts */}
					<button className="lg:hidden">
						<FaBars className="h-6 w-6" />
					</button>

					{/* Logo */}
					<div className="flex items-center flex-shrink-0 absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 lg:mr-6">
						<span className="font-semibold text-xl tracking-tight">
							E-shop
						</span>
					</div>

					{/* Categories for Desktop layout */}
					<nav className="hidden lg:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
						{categories.map((category) => (
							<a
								key={category}
								href="#"
								className="text-2xl hover:text-yellow-500"
							>
								{category}
							</a>
						))}
					</nav>

					{/* Account and Cart for all layouts */}
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleSearch}
							className="hover:text-yellow-500"
						>
							<FaSearch className="h-5 w-5" />
						</button>
						<a href="#" className="hover:text-yellow-500">
							<FaUser className="h-5 w-5" />
						</a>
						<a href="#" className="hover:text-yellow-500">
							<FaShoppingBag className="h-5 w-5" />
						</a>
						{/* <a href="#" className="hover:text-yellow-500">
							Login / Sign Up
						</a> */}
					</div>
				</div>
			</div>

			{/* Input for search when search icon is clicked*/}
			{isSearchOpen && (
				<div className="bg-gray-700 py-4">
					<div className="container mx-auto px-4">
						<form className="flex items-center">
							<input
								type="text"
								placeholder="Search for products"
								name=""
								id=""
								className="flex-grow p-2 rounded-l-md focus:outline-none text-gray-800"
							/>
							<button
								type="submit"
								className="bg-black text-white p-2 rounded-r-md hover:bg-gray-700 focus:outline-none"
							>
								Search
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Menu for Categories in mobile and tablet view */}
			<div
				className={`fixed inset-x-0 top-0 z-50 bg-gray-800 transform ${
					isMenuOpen ? "translate-y-0" : "-translate-y-full"
				} transition-transform duration-300 ease-in-out lg:hidden`}
			>
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center mb-4">
						<span className="font-semibold text-xl">
							Categories
						</span>
						<button
							onClick={closeMenu}
							className="text-gray-300 hover:text-white"
						>
							<FaTimes className="h-6 w-6" />
						</button>
					</div>
					<nav className="flex flex-col space-y-2">
						{categories.map((category) => (
							<a
								key={category}
								href="#"
								className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded"
								onClick={closeMenu}
							>
								{category}
							</a>
						))}
						<a
							href="#"
							className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded"
							onClick={closeMenu}
						>
							Login / Sign Up
						</a>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
