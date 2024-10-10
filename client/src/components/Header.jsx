import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons from lucide-react

const Header = () => {
	// State to control the visibility of the mobile menu
	const [isOpen, setIsOpen] = useState(false);

	// Function to toggle the menu open/close state
	const toggleMenu = () => {
		setIsOpen(!isOpen); // Toggle the boolean value of isOpen
	};

	// Function to close the menu
	const closeMenu = () => {
		setIsOpen(false); // Set isOpen to false to close the menu
	};

	return (
		<header className="bg-white shadow">
			<div className="container mx-auto flex justify-between items-center p-4">
				<h1 className="text-2xl font-bold text-gray-800">
					BAPE
				</h1>

				{/* Hamburger menu button for small and medium devices */}
				<button
					onClick={toggleMenu}
					className="lg:hidden focus:outline-none"
					aria-label="Toggle menu"
				>
					{isOpen ? (
						<X className="w-6 h-6" /> // Use the X icon for close
					) : (
						<Menu className="w-6 h-6" /> // Use the Menu icon for open
					)}
				</button>

				{/* Desktop Navigation Links for large devices */}
				<ul className="hidden lg:flex lg:space-x-4">
					<li>
						<a
							href="#"
							className="text-gray-600 hover:text-black"
						>
							Home
						</a>
					</li>
					<li>
						<a
							href="#"
							className="text-gray-600 hover:text-black"
						>
							Shop
						</a>
					</li>
					<li>
						<a
							href="#"
							className="text-gray-600 hover:text-black"
						>
							About
						</a>
					</li>
					<li>
						<a
							href="#"
							className="text-gray-600 hover:text-black"
						>
							Contact
						</a>
					</li>
				</ul>
			</div>

			{/* Mobile Navigation Menu */}
			{isOpen && (
				<nav className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 lg:hidden">
					<div className="flex justify-end p-4">
						<button
							onClick={closeMenu}
							className="text-white"
							aria-label="Close menu"
						>
							<X className="w-6 h-6" />{" "}
							{/* Use the X icon for close */}
						</button>
					</div>

					{/* Mobile Navigation Links */}
					<ul className="flex flex-col items-center space-y-4 p-4">
						<li>
							<a
								href="#"
								onClick={closeMenu}
								className="text-white hover:text-gray-300"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={closeMenu}
								className="text-white hover:text-gray-300"
							>
								Shop
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={closeMenu}
								className="text-white hover:text-gray-300"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={closeMenu}
								className="text-white hover:text-gray-300"
							>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Header;
