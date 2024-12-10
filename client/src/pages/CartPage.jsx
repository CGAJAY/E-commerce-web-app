import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import {
	FaArrowRight,
	FaShoppingBag,
} from "react-icons/fa";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CartPage = () => {
	const { isAuthenticated } = useAuthStore(
		(state) => state
	);
	const [cart, setCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0); // State to store the total price

	// React Router navigate function
	const navigate = useNavigate();

	// Fetch cart details based on authentication status
	const fetchCart = async () => {
		try {
			if (isAuthenticated) {
				// Fetch cart for logged-in users
				const response = await fetch(
					`${backendUrl}/api/v1/cart`,
					{
						method: "GET", // Use GET to retrieve data from the server
						headers: { "Content-Type": "application/json" },
						credentials: "include",
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch cart");
				}

				const data = await response.json();
				setCart((prevCart) => {
					console.log("Previous cart state:", prevCart);
					console.log(
						"New cart state from backend:",
						data.cart
					);
					return data.cart;
				});
			} else {
				// Fetch product details for items stored in localStorage
				const localCart =
					JSON.parse(localStorage.getItem("cart")) || [];
				const productIds = localCart.map(
					(item) => item._id
				);

				if (productIds.length > 0) {
					const response = await fetch(
						`${backendUrl}/api/v1/cart/products/details`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							credentials: "include",
							body: JSON.stringify({ productIds }),
						}
					);

					if (!response.ok) {
						throw new Error(
							"Failed to fetch product details"
						);
					}

					const data = await response.json();

					const detailedCart = localCart.map((cartItem) => {
						const productDetails = data.cart.find(
							(product) => product._id === cartItem._id
						);
						return {
							...cartItem,
							...productDetails,
							quantity: cartItem.quantity || 1, // Ensure quantity from localStorage is used
						};
					});

					setCart(detailedCart);
				}
			}
		} catch (error) {
			console.error("Error fetching cart:", error);
			setCart([]); // Reset cart on error
		}
	};

	// Calculate total price based on cart items
	const calculateTotalPrice = () => {
		const price = cart.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setTotalPrice(price);
	};

	useEffect(() => {
		fetchCart();
	}, [isAuthenticated]);

	useEffect(() => {
		// Recalculate total price whenever the cart changes
		calculateTotalPrice();
	}, [cart]);

	const handleCheckout = () => {
		if (!isAuthenticated) {
			// Redirect to profile page if not logged in
			alert("Please login to proceed to checkout.");
			navigate("/profile");
		} else {
			navigate("/payment");
		}
	};

	return (
		<div className="container mx-auto p-4">
			{/* If cart is empty */}
			{cart.length === 0 ? (
				<div className="text-center py-20">
					<FaShoppingBag className="mx-auto text-6xl text-black mb-4" />
					<h2 className="text-4xl font-bold mb-2">
						YOUR BAG IS EMPTY
					</h2>
					<p className="text-gray-600 mb-6">
						Once you add something to your bag - it will
						appear here. Ready to get started?
					</p>
					<div className="flex justify-center space-x-2">
						<Link
							to="/"
							className="relative bg-black border border-black px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-500"
						>
							<span className="w-60 block -z-10 absolute top-5 border-2 border-black -right-2 bg-white">
								h
							</span>
							<span className="mr-6">
								CONTINUE SHOPPING
							</span>
							<FaArrowRight className="ml-2 inline-block" />
						</Link>
					</div>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
					{/* Cart Items Section */}
					<div className="flex-1 bg-white p-4 border-2 border-gray-200">
						<h2 className="text-3xl font-extrabold mb-4">
							YOUR BAG
						</h2>
						<div className="space-y-4">
							{cart.map((item) => (
								<div
									key={item._id}
									className="flex items-center space-x-4"
								>
									<img
										src={item.image}
										alt={item.name}
										className="w-40 h-40 object-cover"
									/>
									<div className="flex-1">
										<h3 className="text-lg font-bold">
											{item.name}
										</h3>
										<h3 className=" my-2 text-gray-600">
											{item.description}
										</h3>
										<p className="text-gray-600">
											${item.price.toFixed(2)}
										</p>
										<div className="flex items-center space-x-2 mt-2">
											<label
												htmlFor={`quantity-${item.id}`}
												className="text-gray-600"
											>
												Quantity:
											</label>
											<select
												id={`quantity-${item.id}`}
												value={item.quantity}
												onChange={(e) => {
													/* handle quantity change */
												}}
												className="border rounded-md px-2 py-1"
											>
												{[...Array(10).keys()].map(
													(num) => (
														<option
															key={num}
															value={num + 1}
														>
															{num + 1}
														</option>
													)
												)}
											</select>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Order Summary Section */}
					<div className="lg:w-1/3 ">
						<div className="border-2 p-4 mb-2 border-gray-200">
							<h2 className="text-2xl font-extrabold mb-4">
								ORDER SUMMARY
							</h2>
							<div className="flex justify-between mb-2">
								<span className="text-gray-600">
									Subtotal:
								</span>
								<span className="text-gray-800">
									${totalPrice.toFixed(2)}{" "}
									{/* Display the total price */}
								</span>
							</div>
							<div className="flex justify-between mb-2">
								<span className="font-extrabold text-black text-xl">
									Total:
								</span>
								<span className="text-gray-800 font-bold">
									${totalPrice.toFixed(2)}{" "}
									{/* Display the total price */}
								</span>
							</div>
						</div>
						<button
							onClick={handleCheckout}
							className="block w-full relative bg-black border border-black px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-500"
						>
							<span className="w-full block -z-10 absolute top-5 border-2 border-black -right-2 bg-white">
								h
							</span>
							<div className="flex justify-between items-center">
								<span className="">CHECKOUT</span>
								<FaArrowRight className=" w-12" />
							</div>
						</button>

						<div className="my-8 space-x-2">
							<span className="block text-center">
								ACCEPTED PAYMENT METHODS
							</span>
							<div className="flex justify-between">
								<img
									src="https://static.crypto.com/token/icons/bitcoin/color_icon.png"
									alt="bitcoin"
									className="h-12 w-12"
								/>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ethereum_logo.svg/735px-Ethereum_logo.svg.png"
									alt="Ethereum"
									className="h-12 w-12"
								/>
								<img
									src="https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
									alt="solana"
									className="h-12 w-12"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
