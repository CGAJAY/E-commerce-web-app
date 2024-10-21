import React from "react";
import {
	FaBars,
	FaSearch,
	FaShoppingBag,
	FaUser,
} from "react-icons/fa";

const Header = () => {
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

					{/* Account and Cart */}
					<div className="flex items-center space-x-4">
						<button className="hover:text-yellow-500">
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
			<h2>Hello</h2>
		</header>
	);
};

export default Header;
