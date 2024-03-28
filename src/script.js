const products = [
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img1.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex Sweater",
        category: "Sweater",
        price: 39.99,
        color: "Cream",
        size: "XL",
        image: "images/img2.jpg",
        description: "A classic cream wooven sweater.",
        stock: 5
    },
    {
        id: 1,
        name: "Casio Watch",
        category: "Watch",
        price: 29.99,
        color: "Black",
        size: "L",
        image: "images/img3.jpg",
        description: "A classic black casio watch.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img4.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img5.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img6.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img7.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    },
    {
        id: 1,
        name: "Unisex T-Shirt",
        category: "T-Shirts",
        price: 19.99,
        color: "Blue",
        size: "L",
        image: "images/img8.jpg",
        description: "A classic blue unisex t-shirt made from soft cotton fabric.",
        stock: 50
    }
];
const productListDiv = document.getElementById('section');
console.log(productListDiv);

products.forEach((item, index) => {

    const productDiv = document.createElement('div');

    productDiv.classList.add('item-container');
    productDiv.innerHTML = `
                                <img class="item-image" src="${item.image}" alt="">
                                <div class="item-description">
                                    <p class="item-name">${item.name}</p>
                                    <span class="item-amount">$${item.price}</span>
                                </div>
                                <button class="buy-button">ADD TO CART</button>
    `;
    productListDiv.appendChild(productDiv);
});
