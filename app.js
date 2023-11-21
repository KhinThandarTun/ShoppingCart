let productDiv = document.querySelector('#product-div');
let cartsDiv = document.querySelector('.carts-table');
let show = document.querySelector('.show');

//Display Product
function displayProducts(){
    products.forEach((product) => {
        productDiv.innerHTML += `
            <div class="col-12 col-lg-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <img src=${product.src} class="w-100"/>
                        <p class="mt-3">${product.name}</p>
                        <p>Price - $ ${product.price}</p>
                        <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addtoCarts(${product.id})">Add to Cart</div>
                    </div>
                </div>
            </div>
        `
    });
}

displayProducts();

// cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

//cart arrays
function addtoCarts(id){
    if(carts.some((cart) => cart.id == id)){
        changeQuantity("plus",id);
    }else{
        let cart = products.find((product) => product.id == id);
        carts.push({
            ...cart,
            quantity: 1,
          });
    }

    updateCarts();
}

function renderNumber(){
    let totalPrice = 0, totalCart = 0;
    carts.forEach((cart) => {
        totalPrice += cart.price * cart.quantity;
        totalCart += cart.quantity;
    });

    document.querySelector('#totalPrice').innerHTML = `$ ${totalPrice}`;
    document.querySelector('#totalCart').innerHTML = `$ ${totalCart}`;
}

function updateCarts(){
    renderProductsCarts();
    renderNumber();
    localStorage.setItem("productCarts", JSON.stringify(carts));
}

function changeQuantity(condition,id){
    carts = carts.map((cart) => {
        let quantity = cart.quantity;

        if(cart.id == id){
            if(condition == "plus"){
             quantity++;
            }else if(condition == "minus" && quantity > 1){
             quantity--;
            }
         }
     
         return {
             ...cart,quantity,
         };
     
    });

    updateCarts();
}

//render ProductCarts
function renderProductsCarts(){
    cartsDiv.innerHTML = '';
    show.innerHTML = '';
    carts.map((cart) => {
        cartsDiv.innerHTML +=`
        <tr>
            <td>
                <img src="${cart.src}" name="${cart.name}" style="width:100px;height:100px;"/>
            </td>
            <td>
                <p class="fs-5 pt-2">$ ${cart.price}</p>
            </td>
            <td>
            <i class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})"></i>
            <span class="mx-2 fs-5 pt-3">${cart.quantity}</span>
            <i class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})"></i>
            </td>
            <td>
            <i class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})"
            title="Remove"></i>
            </td>
        </tr>
        `
    });
    show_hide();
}

// show hide
function show_hide() {
    if (!cartsDiv.innerHTML) {
      show.innerHTML = `<h5 class="my-3 text-center text-primary">No item in cart.</h5>
                <hr />`;
    }
  }
  

function removeCart(id){
    carts = carts.filter((cart) => cart.id != id);
    updateCarts();
}

updateCarts();

