const body = document.querySelector('body');

// Creates a div for each product
const rearrangeProducts = (arr) => {
    let productsContainer = document.getElementById('productsContainer');

    arr.forEach((val, index) => {
        let productDiv = document.createElement('div');
        productDiv.setAttribute('class', 'items');
        productDiv.setAttribute('id', `item${index}`);
        productDiv.setAttribute('onclick', `item(${index})`);
        productDiv.setAttribute('onmouseover', `hoverItem(${index})`);
        productDiv.setAttribute('onmouseout', `outOfItem(${index})`);
        productDiv.setAttribute('onmousedown', `downItem(${index})`);
        productDiv.setAttribute('onmouseUP', `upItem(${index})`);
        productDiv.style.width = '597px';
        productDiv.style.height = '50px';
        productDiv.style.margin = 'auto';
        productDiv.style.border = '1px solid royalblue';
        productDiv.style.display = 'flex';
        productDiv.style.justifyContent = 'space-between';
        productDiv.style.alignContent = 'center';

        let pName = document.createElement('p');
        pName.setAttribute('class', `pName`);
        pName.style.paddingLeft = '10px';

        let pPrice = document.createElement('p');
        pPrice.setAttribute('class', `pPrice`);
        pPrice.style.paddingRight = '10px';

        pName.innerHTML = val.productName;
        pPrice.innerHTML = val.price;

        productDiv.append(pName, pPrice);
        productsContainer.appendChild(productDiv);
    })

}
// Array for all the products in the db. Will be used in sortProducts()
let productsArr = [];

// Showing the products on page
const showProducts = async () => {
    fetch('/products')
        .then(res => res.json())
        .then(data => {
            productsArr = [...data];
            rearrangeProducts(productsArr);
        })
        .catch(err => console.log(err));
}

let orderdProducts = [];//array of products ordered by the user
let totalProducts = 0;//variable to sum up all chosen products
let totalPrice = 0;//variable to sum up the total price

const hoverItem = (id) => {
    let currentDiv = document.getElementById(`item${id}`);
    currentDiv.style.backgroundColor = 'cornflowerblue';
    currentDiv.style.cursor = 'pointer';
}

const outOfItem = (id) => {
    let currentDiv = document.getElementById(`item${id}`);
    currentDiv.style.backgroundColor = '#FAF3F0';
}

// A mouse button is pressed over an element and makes it pop out
const downItem = (id) => {
    let currentDiv = document.getElementById(`item${id}`);
    currentDiv.style.transform = 'scale(1.1)';
    currentDiv.style.transition = '0.5s';
}

// 	The mouse button is released over an element and returns it to its default
const upItem = (id) => {
    let currentDiv = document.getElementById(`item${id}`);
    currentDiv.style.transform = 'scale(1)';
}

// When the user clicks on an item
const item = (id) => {
    let childs = document.getElementById(`item${id}`).children;//array of p tags
    orderdProducts.push({ productName: childs[0].innerText, price: childs[1].innerText });
    totalPrice += parseInt(childs[1].innerText);
    // Print the array of products that the user chose
    console.log(orderdProducts);
}


const sortProducts = () => {
    let sortOption = document.getElementById('select').value;
    let productsContainer = $('#productsContainer');
    let divsArr = productsContainer.children();
    let temp = [...divsArr];
    let sortProductsArr = [];

    if (sortOption == '1') { // sort by name
        sortProductsArr = temp.sort((a, b) => {
            let vA = a.childNodes[0].innerText;
            let vB = b.childNodes[0].innerText;
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0
        })
    }
    else {
        sortProductsArr = temp.sort((a, b) => { //sort by price
            let vA = parseInt(a.childNodes[1].innerText);
            let vB = parseInt(b.childNodes[1].innerText);
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0
        })
    }
    productsContainer.append(sortProductsArr);
}

// When the user presses the buy button
const buy = () => {
    totalProducts = orderdProducts.length;

    localStorage.setItem('prodArrItem', JSON.stringify(orderdProducts));
    localStorage.setItem('productItem', totalProducts);
    localStorage.setItem('priceItem', totalPrice);

    location.href = '/buy';
}

// bonus task
const searchProduct = () => {
    let productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    let temp = productsArr;
    let productInput = document.getElementById('searchInput').value;
    let filteredArr = temp.filter(val => val.productName.includes(productInput));

    if (filteredArr == '') {
        let noMatchP = document.createElement('p');
        noMatchP.innerHTML = 'No match found...';
        noMatchP.style.fontSize = '18px';
        productsContainer.appendChild(noMatchP);
        document.getElementById('buyBtn').style.display = 'none';
    } else {
        document.getElementById('buyBtn').style.display = 'block';
        rearrangeProducts(filteredArr);
    }
}


// When page loads the showProducts function runs
body.onload = showProducts();


