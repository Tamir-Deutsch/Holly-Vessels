let purchaseDiv = document.getElementById('purchaseDiv');
let p1 = document.getElementById('totalProduct');
let p2 = document.getElementById('totalPrice');

let totalProductsDisplay = localStorage.getItem('productItem');
let totalPriceDisplay = localStorage.getItem('priceItem');

p1.innerHTML += totalProductsDisplay;
p2.innerHTML += totalPriceDisplay;

const approve = () => {
    let userEmailData = localStorage.getItem('userEmailItem');
    let prodArrData = JSON.parse(localStorage.getItem('prodArrItem'));

    fetch('/purchase', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            userEmailData,
            prodArrData
        })
    })
        .then(res => res.json())
        .then(data => {
            alert(data);
        })
        .catch(err => console.log(err));
    // 
    localStorage.clear('userEmailData, prodArrItem');
    location.href = '/';
}


