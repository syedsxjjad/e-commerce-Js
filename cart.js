const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
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

    ///total items
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
            <small>$${item.price}</small>
        </div>
        <div class="units">
            <div class="btn minus" id="mn" onclick="changeNou('minus',${item.id})">-</div>
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