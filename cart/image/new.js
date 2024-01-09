const bar = document.querySelector('.fa-bars');
const cross = document.querySelector('#hdcross');

const headerbar = document.querySelector('.headerbar');
bar.addEventListener('click', function () {
    setTimeout(() => {
        cross.style.display = 'block';
    }, 200);
    headerbar.style.right = '0%';
})
cross.addEventListener('click', function () {
    cross.style.display = 'none';
    headerbar.style.right = '-100%';
})
let cart = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Food Name1',
        tag: 'product1',
        price: 225,
        inCart: 0
    },
    {
        name: 'Food Name2',
        tag: 'product2',
        price: 250,
        inCart: 0
    },
    {
        name: 'Food Name3',
        tag: 'product3',
        price: 300,
        inCart: 0
    },
    {
        name: 'Food Name4',
        tag: 'product4',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name5',
        tag: 'product5',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name6',
        tag: 'product6',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name7',
        tag: 'product7',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name8',
        tag: 'product8',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name9',
        tag: 'product9',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name10',
        tag: 'product10',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name11',
        tag: 'product11',
        price: 200,
        inCart: 0
    },
    {
        name: 'Food Name12',
        tag: 'product12',
        price: 200,
        inCart: 0
    }
]
for(let i=0;i<cart.length;i++){
    cart[i].addEventListener('click',()=>{
        cartnumbers(products[i]);
        totalcost(products[i]);
    })
}
function onloadcartnumber(){
    let productnumber = localStorage.getItem('cartnumbers');
    
}

function cartnumbers(product){
    
   let productnumber = localStorage.getItem('cartnumbers');
   productnumber = parseInt(productnumber);
   if(productnumber){
    document.querySelector('.cart-sup sup').textContent = productnumber;
}
   if(productnumber){
    localStorage.setItem('cartnumbers', productnumber + 1);
    document.querySelector('.cart-sup sup').textContent = productnumber + 1;
   }else{
    localStorage.setItem('cartnumbers',1);
    document.querySelector('.cart-sup sup').textContent = 1;
   }
   setItem(product);
}
function setItem(product){
    let cartitems = localStorage.getItem('ProductInCart');
    cartitems = JSON.parse(cartitems);
    if(cartitems != null){
        if(cartitems[product.tag] == undefined){
            cartitems = {
                ...cartitems,
                [product.tag]: product
            }
        }
        cartitems[product.tag].inCart += 1;
       

        }else{
            product.inCart = 1;
            cartitems = {
                [product.tag]: product
            }
        }
        
    
    
    
    localStorage.setItem("ProductInCart", JSON.stringify(cartitems));
}
function totalcost(product){
let cartcost = localStorage.getItem('Total cost');

console.log("cartcost is", cartcost);
console.log(typeof cartcost);
if(cartcost != null){
    cartcost = parseInt(cartcost);
    localStorage.setItem("Total cost", cartcost + product.price);
}else{
    localStorage.setItem("Total cost", product.price);
}
}
function displaycart(){
    let cartitem = localStorage.getItem('ProductInCart');
    cartitem = JSON.parse(cartitem);
    let container = document.querySelector('.products');
    let cartcost = localStorage.getItem('Total cost');
    
    if (cartitem && container) {
        container.innerHTML = ``;
        Object.values(cartitem).map(item => {
            container.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle" class="remove-item"></ion-icon>
                <img src="./image/${item.tag}.PNG">
                <span>${item.name}</span>
                <div class="price">${item.price}</div>
                <div class="quentity">
                    <ion-icon name="arrow-back-circle-outline" onclick="decreaseButtons()" class="decrease"></ion-icon>
                    <span class="span">${item.inCart}</span>
                    <ion-icon name="arrow-forward-circle-outline" onclick="increaseButtons()" class="increase"></ion-icon>
                </div>
                <div class="total">
                    ₹${item.inCart * item.price}
                </div>
            </div>`;
        });
        container.innerHTML += `
        <div class="totalcontainer">
            <h4 class="totaltitle">Basket Total</h4>
            <h4 class="baskettotal">₹${cartcost}</h4>
        </div>`;
        
        // Add event listeners for quantity buttons and remove item button
        
        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateQuantity(button, -1);
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateQuantity(button, 1);
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                removeItem(button);
            });
        });
    }
}

function updateQuantity(button, change) {
    const span = button.parentElement.querySelector('.span');
    const itemTag = getItemTagFromButton(button);
    let cartitems = JSON.parse(localStorage.getItem('ProductInCart'));
    
    if (cartitems && cartitems[itemTag]) {
        cartitems[itemTag].inCart += change;
        if (cartitems[itemTag].inCart < 1) {
            delete cartitems[itemTag];
        }
        localStorage.setItem('ProductInCart', JSON.stringify(cartitems));
        span.textContent = cartitems[itemTag] ? cartitems[itemTag].inCart : 0;
        displaycart();
    }
}

function removeItem(button) {
    const itemTag = getItemTagFromButton(button);
    let cartitems = JSON.parse(localStorage.getItem('ProductInCart'));

    if (cartitems && cartitems[itemTag]) {
        delete cartitems[itemTag];
        localStorage.setItem('ProductInCart', JSON.stringify(cartitems));
        displaycart();
    }
}

function getItemTagFromButton(button) {
    const productDiv = button.closest('.product');
    const itemTag = productDiv.querySelector('.span').dataset.tag;
    return itemTag;
}

displaycart();
onloadcartnumber();
