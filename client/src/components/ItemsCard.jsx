import ItemCard from "./ItemCard";
import { items } from "../items.js";
const ItemsCard = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
				Our Products
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{items.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default ItemsCard;
