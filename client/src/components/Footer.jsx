import {
	FaFacebook,
	FaTwitter,
	FaInstagram,
	FaLinkedin,
	FaPinterest,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-black text-white py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
							E-Shop
						</h3>
						<p className="text-white mb-2">
							Your one-stop shop for the latest in tech
							gadgets, phones, laptops, and accessories.
						</p>
						<p className="text-white">
							© 2024 E-Shop. All rights reserved.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<a href="#">Home</a>
							</li>
							<li>
								<a href="#shop">Shop</a>
							</li>
							<li>
								<a href="#about">About Us</a>
							</li>
							<li>
								<a href="#contact">Contact Us</a>
							</li>
							<li>
								<a href="#faq">FAQs</a>
							</li>
						</ul>
					</div>

					{/* Customer Support */}
					<div>
						<h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
							Customer Support
						</h3>
						<ul className="space-y-2">
							<li>
								<a href="#return">Returns</a>
							</li>
							<li>
								<a href="#shipping">Shipping</a>
							</li>
							<li>
								<a href="#payment">Payment Methods</a>
							</li>
							<li>
								<a href="#privacy">Privacy Policy</a>
							</li>
							<li>
								<a href="#terms">Terms of Service</a>
							</li>
						</ul>
					</div>

					{/* Follow Us */}
					<div>
						<h3 className="text-xl font-semibold mb-4 text-center lg:text-left">
							Follow Us
						</h3>
						<div className="flex space-x-4 mx-auto justify-center">
							<a href="#">
								<FaFacebook className="h-6 w-6" />
							</a>
							<a href="#">
								<FaTwitter className="h-6 w-6" />
							</a>
							<a href="#">
								<FaInstagram className="h-6 w-6" />
							</a>
							<a href="#">
								<FaLinkedin className="h-6 w-6" />
							</a>
							<a href="#">
								<FaPinterest className="h-6 w-6" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
