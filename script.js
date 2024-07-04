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
	interestedProduct.classList.add("part1");
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

	// interestedProductLink.appendChild(
	// 	likeInterestedProductCont
	// );
	interestedProductPart1.appendChild(
		interestedProductimage
	);
	interestedProductPart1.appendChild(priceBtn);
	likeInterestedProductCont.appendChild(
		likeInterestedProductBtn
	);
	interestedProductPart1.appendChild(
		likeInterestedProductCont
	);
	interestedProductLink.appendChild(interestedProductPart1);
	interestedProduct.appendChild(interestedProductLink);
	interestedProductCont.appendChild(interestedProduct);
}
console.log(getProduct(product));
