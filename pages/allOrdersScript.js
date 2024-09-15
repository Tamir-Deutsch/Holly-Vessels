const body = document.querySelector('body');


const showPendingOrders = () => {
    fetch('/allPending')
        .then(res => res.json())
        .then(data => {
            data.forEach(val => {
                let pendingDiv = document.getElementById('pendingDiv');
                pendingDiv.style.display = 'flex';
                pendingDiv.style.flexWrap = 'wrap';

                let divPerOrder = document.createElement('div');
                divPerOrder.style.display = 'flex';
                divPerOrder.style.flexDirection = 'column';
                divPerOrder.style.width = '200px';
                divPerOrder.style.border = '2px solid steelblue';

                let buyerNameP = document.createElement('p');
                buyerNameP.innerHTML = val.buyerName;
                buyerNameP.style.paddingBottom = '20px'
                buyerNameP.style.borderBottom = '2px solid steelblue';
                buyerNameP.style.lineHeight = '15px';
                let shoppingListDiv = document.createElement('div');

                val.listOfProducts.forEach(val => {
                    let productDiv = document.createElement('div');
                    productDiv.style.display = 'flex';
                    productDiv.style.flexDirection = 'row';
                    productDiv.style.justifyContent = 'space-between';
                    productDiv.style.marginLeft = '5px';
                    productDiv.style.marginRight = '5px';
                
                    let pName = document.createElement('p');
                    let pPrice = document.createElement('p');

                    pName.innerHTML = val.productName;
                    pPrice.innerHTML = val.price;

                    productDiv.append(pName, pPrice);
                    shoppingListDiv.appendChild(productDiv);
                })
                divPerOrder.append(buyerNameP, shoppingListDiv);
                pendingDiv.appendChild(divPerOrder);
            });
        })
        .catch(err => console.log(err))
}

// When page loads the showPendingOrders function runs
body.onload = showPendingOrders();