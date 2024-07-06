let product = [
	{
		id: 1,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/14dc7766a0224edca915f394afd1f237_9366/Adicolor_Satin_Wide_Leg_Track_Pants_Black_IU2520_21_model.jpg",
		liked: false,
		price: 85,
		title: "Adicolor Satin leg Track pants",
		description: "Originals",
	},
	{
		id: 2,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/9bf0091a0f5c46738d14bc8ba5989756_9366/Adicolor_Firebird_Loose_Track_Pants_Green_IP0634_21_model.jpg",
		liked: false,
		price: 70,
		title: "Adicolor Firebird Loose Track Pants",
		description: "Originals",
	},
	{
		id: 3,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/2eb6e1b91bfe486fad760fc9924bf054_9366/Samba_OG_Shoes_White_IE6521_01_standard.jpg",
		liked: false,
		price: 100,
		title: "Samba OG Shoes",
		description: "Originals",
	},
	{
		id: 4,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/0d61e074ee424217b708fc25fef17b14_9366/Adicolor_3-Stripes_Tube_Top_Black_IX7823_21_model.jpg",
		liked: false,
		price: 30,
		title: "Adicolor 3-Stripes Tube Top",
		description: "Originals",
	},
	{
		id: 5,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/1af937cfedab43f680b303b57d9d784c_9366/adidas_x_FARM_Rio_Denim_Track_Top_Blue_IW0793_21_model.jpg",
		liked: false,
		price: 130,
		title: "adidas x FARM Rio Denim Track Top",
		description: "Originals",
	},
	{
		id: 6,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/d0c141f2660a4a11b90972cc72e1e83c_9366/Power_Boxy_French_Terry_3-Stripes_Tank_Top_White_IW3188_21_model.jpg",
		liked: false,
		price: 45,
		title: "Power Boxy French Terry 3-Stripes Tank Top",
		description: "Performance",
	},
	{
		id: 7,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/981b637c5d3b40d49d6f24b8a9843629_9366/80s_Track_Pants_Blue_JC6148_21_model.jpg",
		liked: false,
		price: 80,
		title: "'80s Track Pants",
		description: "Originals",
	},
	{
		id: 8,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/e13df4e9d1d34ca39a8b6fa0e86185b0_9366/Adicolor_Neuclassics_Hoodie_Black_IW0975_23_hover_model.jpg",
		liked: false,
		price: 70,
		title: "Adicolor Neuclassics Hoodie",
		description: "Originals",
	},
	{
		id: 9,
		source:
			"https://assets.adidas.com/images/w_600,f_auto,q_auto/55b640477c7c44dcbce23556aebe6d8e_9366/Gazelle_Bold_Shoes_Black_IE0876_01_standard.jpg",
		liked: false,
		price: 120,
		title: "Gazelle Bold Shoes",
		description: "Originals",
	},
];

let container = document.querySelector(".container");
function getProduct(arr) {
	arr.forEach(interestedProductRender);
}
function interestedProductRender(obj) {
	// Grabbing the container to hold all interested products
	let interestedProductCont = document.querySelector(
		".interested-product-cont"
	);
	// Creating parent container forEach product
	let interestedProduct = document.createElement("div");
	interestedProduct.classList.add("interested-product");
	// Creating the link to navigate to more product details
	let interestedProductLink = document.createElement("a");
	interestedProductLink.href = "https://www.google.com";
	interestedProductLink.classList.add("product-link");
	// Creating part1 of the parent container
	let interestedProductPart1 =
		document.createElement("div");
	interestedProductPart1.classList.add("part1");
	// creating img container to hold product image
	let interestedProductimage =
		document.createElement("img");
	interestedProductimage.src = obj.source;
	interestedProductimage.classList.add("product-img");
	// Creating the container to hold the liked button
	let likeInterestedProductCont =
		document.createElement("div");
	likeInterestedProductCont.classList.add(
		"product-like-btn"
	);
	// Create the like btn
	let likeInterestedProductBtn =
		document.createElement("img");
	likeInterestedProductBtn.src =
		"https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/heart-love-like-likes-loved-favorite-512.png";
	likeInterestedProductBtn.classList.add("like");
	// Create the price btn
	let priceBtn = document.createElement("button");
	priceBtn.textContent = `$${obj.price}`;
	priceBtn.classList.add("price");
	// Creating part2 of the parent container
	let interestedProductPart2 =
		document.createElement("div");
	interestedProduct.classList.add("part2");
	// Create interested Product title
	let interestedProductTitle = document.createElement("p");
	interestedProductTitle.textContent = obj.title;
	interestedProductTitle.classList.add("product-title");
	// Create interested Product description
	let interestedProductDesc =
		document.createElement("span");
	interestedProductDesc.textContent = obj.description;
	interestedProductDesc.classList.add("product-desc");

	likeInterestedProductCont.appendChild(
		likeInterestedProductBtn
	);
	interestedProductPart1.appendChild(
		interestedProductimage
	);
	interestedProductPart1.appendChild(
		likeInterestedProductCont
	);
	interestedProductPart1.appendChild(priceBtn);
	interestedProductPart2.appendChild(
		interestedProductTitle
	);
	interestedProductPart2.appendChild(interestedProductDesc);
	interestedProductLink.appendChild(interestedProductPart1);
	interestedProductLink.appendChild(interestedProductPart2);
	interestedProduct.appendChild(interestedProductLink);
	interestedProductCont.appendChild(interestedProduct);
}
getProduct(product);

// script.js

let currentIndex = 0;

// Function to show the slide based on the index
function showSlide(index) {
	const slides = document.querySelectorAll(
		".interested-product"
	);
	const totalSlides = slides.length;

	// 	// Adjust currentIndex for seamless infinite scrolling
	// 	if (index >= totalSlides - 4) {
	// 		currentIndex = 0;
	// 	} else if (index < 0) {
	// 		currentIndex = totalSlides - 1;
	// 	} else {
	// 		currentIndex = index;
	// 	}

	// 	// Calculate the offset for the slide position
	// 	const offset = -currentIndex * 50;
	// 	const slideContainer = document.querySelector(
	// 		".interested-product-cont"
	// 	);
	// 	slideContainer.style.transition =
	// 		"transform 0.5s ease-in-out";
	// 	slideContainer.style.transform = `translateX(${offset}%)`;
	// }

	// Calculate the number of visible slides based on the container width
	const containerWidth = document.querySelector(
		".interested-product-cont"
	).offsetWidth;
	const slideWidth = slides[0].offsetWidth;
	const visibleSlides = Math.floor(
		containerWidth / slideWidth
	);

	// Adjust currentIndex for infinite scrolling
	if (index >= totalSlides - visibleSlides + 2) {
		currentIndex = 0;
	} else if (index < 0) {
		currentIndex = totalSlides - visibleSlides;
	} else {
		currentIndex = index;
	}

	// Calculate the offset for the slide position
	const offset = (-currentIndex * 100) / visibleSlides;
	const slideContainer = document.querySelector(
		".interested-product-cont"
	);
	slideContainer.style.transition =
		"transform 0.5s ease-in-out";
	slideContainer.style.transform = `translateX(${offset}%)`;
}

// Function to move to the next slide
function nextSlide() {
	showSlide(currentIndex + 1);
}

// Function to move to the previous slide
function prevSlide() {
	showSlide(currentIndex - 1);
}

// Initialize the carousel by showing the first slide
window.addEventListener("load", () => {
	showSlide(currentIndex);
});

// Optional: Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Stop auto-slide when user interacts
document
	.querySelector(".interested-product-cont")
	.addEventListener("mouseover", () => {
		clearInterval(autoSlideInterval);
	});

// Resume auto-slide when user stops interacting
document
	.querySelector(".interested-product-cont")
	.addEventListener("mouseout", () => {
		autoSlideInterval = setInterval(nextSlide, 3000);
	});
