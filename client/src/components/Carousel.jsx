import { useState, useEffect } from "react";

const Carousel = () => {
	const adverts = [
		{
			id: 1,
			image:
				"https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			title: "Latest Smartphones",
			productLink: "#product-details",
		},
		{
			id: 2,
			image:
				"https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			title: "Powerful Laptops",
			productLink: "#product-details",
		},
		{
			id: 3,
			image:
				"https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			title: "High-Quality Headphones",
			productLink: "#product-details",
		},
		{
			id: 4,
			image:
				"https://images.pexels.com/photos/4498479/pexels-photo-4498479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
			title: "Smartwatches Collection",
			productLink: "#product-details",
		},
	];

	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	// Move to the next slide every 3 seconds if not hovered
	useEffect(() => {
		if (!isHovered) {
			const interval = setInterval(() => {
				setCurrentSlide(
					(prevSlide) => (prevSlide + 1) % adverts.length
				);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [isHovered, adverts.length]);

	// Navigate to next or previous slide
	const goToSlide = (index) => setCurrentSlide(index);

	return (
		<div
			className="relative w-full h-full lg:h-[75vh] overflow-hidden shadow-md"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Slides */}
			<div
				className="flex transition-transform duration-700 ease-in-out xl:h-[75vh]"
				style={{
					transform: `translateX(-${currentSlide * 100}%)`,
				}}
			>
				{adverts.map((advert, index) => (
					<div
						key={advert.id}
						className="w-full flex-shrink-0 "
					>
						<a href={advert.productLink}>
							<img
								src={advert.image}
								alt={advert.title}
								className="w-full h-full object-cover"
							/>
						</a>
					</div>
				))}
			</div>

			{/* Navigation Dots */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{adverts.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-3 w-3 rounded-full ${
							currentSlide === index
								? "bg-blue-500"
								: "bg-gray-300"
						}`}
					></button>
				))}
			</div>

			{/* Previous and Next buttons */}
			<button
				className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 hover:bg-opacity-70 text-white px-2 py-1 rounded-r-md"
				onClick={() =>
					setCurrentSlide((prevSlide) =>
						prevSlide === 0
							? adverts.length - 1
							: prevSlide - 1
					)
				}
			>
				‹
			</button>
			<button
				className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 hover:bg-opacity-70 text-white px-2 py-1 rounded-l-md"
				onClick={() =>
					setCurrentSlide(
						(prevSlide) => (prevSlide + 1) % adverts.length
					)
				}
			>
				›
			</button>
		</div>
	);
};

export default Carousel;
