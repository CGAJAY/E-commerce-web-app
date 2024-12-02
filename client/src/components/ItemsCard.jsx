import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ItemsCard = () => {
	const [items, setItems] = useState([]); // State to store the fetched items
	const [loading, setLoading] = useState(true); // State to manage loading state
	const [error, setError] = useState(null); // State to manage error handling

	console.log(backendUrl);
	useEffect(() => {
		// Fetch the items from the backend API
		const fetchItems = async () => {
			try {
				const response = await fetch(
					`${backendUrl}/api/v1/products`
				); // Replace with your actual API endpoint
				if (!response.ok) {
					throw new Error("Failed to fetch items");
				}
				const data = await response.json();
				setItems(data); // Set the fetched items to state
			} catch (err) {
				console.log(err);
				setError(err.message); // Set error if the fetch fails
			} finally {
				setLoading(false); // Stop loading once the request is complete
			}
		};

		fetchItems();
	}, []); // Empty dependency array means this runs once on component mount

	if (loading) {
		return (
			<div className="text-center py-10">
				<h2 className="text-xl">Loading products...</h2>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-10">
				<h2 className="text-xl text-red-500">{`Error: ${error}`}</h2>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
				Our Products
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{items.map((item) => (
					<ItemCard key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default ItemsCard;
