import React from "react";

const Header = () => {
	return (
		<header className="bg-white shadow">
			<div className="container mx-auto flex justify-between items-center p-4">
				<h1 className="text-2xl font-bold text-gray-800">
					BAPE
				</h1>
				<nav>
					<ul className="flex space-x-4">
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
				</nav>
			</div>
		</header>
	);
};

export default Header;
