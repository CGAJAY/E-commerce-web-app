import { FaShoppingBag, FaPlus } from "react-icons/fa";
import useCartStore from "../store/useCartStore";

const ItemCard = ({ item }) => {
	const addToCart = useCartStore(
		(state) => state.addToCart
	);

	const handleAddToCart = () => {
		addToCart(item);
		alert(`${item.name} added to cart!`); // Optional feedback to the user
	};

	return (
		<div className="flex flex-col rounded-lg shadow-md overflow-hidden cursor-pointer">
			<div className="relative h-48 md:h-64 lg:h-80">
				<img
					src={item.image}
					alt={item.name}
					className="w-full h-full object-cover"
				/>
				{/* Add to Cart Button with FaShoppingBag and FaPlus icons */}
				<button
					className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
					aria-label="Add to cart"
					onClick={handleAddToCart} // Handle click
				>
					<div className="relative">
						<FaShoppingBag className="w-6 h-6 text-blue-500" />
						{/* Plus Icon in Top Right of Shopping Bag */}
						<FaPlus className="absolute -top-1 -right-2 w-3 h-3  text-blue-500 rounded-full" />
					</div>
				</button>
			</div>
			<div className="p-4 bg-white">
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					{item.name}
				</h3>
				<p className="text-gray-600 mb-2">
					{item.description}
				</p>
				<p className="text-xl font-bold text-black">
					${item.price.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default ItemCard;
