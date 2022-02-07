const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");


// // RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML +=`
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `
  });
}
renderProdcuts();


//cartArray
let cart=JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//Add to cart
function addToCart(id) {
//check if product exist in cart
if (cart.some((item)=> item.id === id)) {
    changeNou("plus",id)
}

else{
    const item= products.find((product)=>product.id === id)
    cart.push({
        ...item,
        numberOfunits:1
    });
}
updateCart();
}

//update cart
function  updateCart() {
    renderCartItems();
   renderSubtotal();


   //save cart to local storage
   localStorage.setItem("CART",JSON.stringify(cart));
}

//calculate and render subtotal
function renderSubtotal() {
    let totalprice=0
    let totalitems=0
    cart.forEach((item)=>{
    totalprice += item.price * item.numberOfunits;
    totalitems += item.numberOfunits;
    })
    subtotalEl.innerHTML = `Subtotal (${totalitems}items):$${totalprice.toFixed(2)} `
    totalItemsInCartEl.innerHTML = totalitems;
}

//render cart items
function renderCartItems() {
    cartItemsEl.innerHTML="";//clear cart element
    cart.forEach((item)=>{
      cartItemsEl.innerHTML +=`
        <div class="cart-item">
         <div class="item-info" onclick="removeitem(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNou('minus',${item.id})">-</div>
            <div class="number">${item.numberOfunits}</div>
            <div class="btn plus" onclick="changeNou('plus',${item.id})">+</div>           
         </div>
        </div>

          `
    })
}
//remove item from cart
function removeitem(id) {
    cart=cart.filter((item)=> item.id !==id)
    updateCart();
}

// change number of units for an item
function changeNou(action,id) {
    
    cart=cart.map((item)=>{
    let numberOfunits=item.numberOfunits;
        
        if (item.id === id) {
            if(action === "minus" && numberOfunits > 1){
            numberOfunits--;
            }
            else if(action === "plus" && numberOfunits < item.instock){
            numberOfunits++;
      }
    }
        return {
            ...item,
            numberOfunits,
        };
    });
    updateCart();
}

