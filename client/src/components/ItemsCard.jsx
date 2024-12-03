import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ItemCard from "./ItemCard";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ItemsCard = () => {
	// State to store the fetched items
	const [items, setItems] = useState([]);
	// State to manage loading state
	const [loading, setLoading] = useState(true);
	// State to manage error handling
	const [error, setError] = useState(null);
	// Access selectedCategory from context
	const { selectedCategory } = useOutletContext();

	// Fetch all items on component mount
	useEffect(() => {
		const fetchItems = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${backendUrl}/api/v1/products`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch items");
				}
				const data = await response.json();
				setItems(data); // Set the fetched items to state
			} catch (err) {
				console.log(err);
				setError(err.message); // Set error if the fetch fails
			} finally {
				// Stop loading once the request is complete
				setLoading(false);
			}
		};

		fetchItems();
	}, []); // Run once on component mount

	// Handle loading state
	if (loading) {
		return (
			<div className="text-center py-10">
				<h2 className="text-xl">Loading products...</h2>
			</div>
		);
	}

	// Filter items based on selected category
	const filteredItems = selectedCategory
		? items.filter(
				(item) =>
					item.category.name.toLowerCase() ===
					selectedCategory.toLowerCase()
		  )
		: items;

	// Handle error state
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
				{selectedCategory
					? `Showing ${selectedCategory} products`
					: "All Products"}
			</h2>
			{filteredItems.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredItems.map((item) => (
						<ItemCard key={item._id} item={item} />
					))}
				</div>
			) : (
				<div className="text-center py-10">
					<h2 className="text-xl text-gray-500">
						No products found.
					</h2>
				</div>
			)}
		</div>
	);
};

export default ItemsCard;
