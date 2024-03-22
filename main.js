const products = [{ prodID: 1, prodName: "עגבניות", prodCost: 9.90, prodImg: "products-img/tomato.webp", prodQuantity: 1 },
{ prodID: 2, prodName: "פלפלים צהובים", prodCost: 10.90, prodImg: "products-img/yellow-gamba.webp", prodQuantity: 1 },
{ prodID: 3, prodName: "מלפפונים", prodCost: 8.90, prodImg: "products-img/cucumber.webp", prodQuantity: 1 },
{ prodID: 4, prodName: "אבטיח", prodCost: 59.40, prodImg: "products-img/watermelon.webp", prodQuantity: 1 },
{ prodID: 5, prodName: "אוכמניות טריות", prodCost: 21.90, prodImg: "products-img/blueberries.webp", prodQuantity: 1 }];

const maxQuantity = 100;
const minQuantity = 1;

function createProductElement(product) {
    return `
        <div class="product" id=${`product${product.prodID}`}>
              <img src="${product.prodImg}" width="90px" height="90ox" />
              <div class="productDetails">
                  <div class="prodName">${product.prodName}</div>
                  <div class="prodCost">₪${product.prodCost.toFixed(2)}</div>
                  <div class="prodOptionsContainer">
                      <div class="plusButton" onClick="addOne(${product.prodID})">+</div>
                      <div class="countProd">
                        <input type=number value=${product.prodQuantity} onInput="onQuantityInputChange(event, ${product.prodID})" 
                            onkeydown="preventSpecialCharacters(event)"></input>
                        <span>יח'</span>
                      </div>
                      <div class="minusButton" onClick="reduceOne(${product.prodID})">-</div>
                      <div class="addButton" onClick="toastNewProduct(${product.prodID})">הוספה</div>
                  </div>
              </div>
              <img src="icons/trash.png" class="bin-icon" onClick="removeProduct(${product.prodID})"/>
        </div>
    `;
}

function renderProducts(productsList) {
    const productsContainer = document.querySelector(".productsContainer");

    productsList.forEach((product) => {
        const productHTML = createProductElement(product);
        productsContainer.innerHTML += productHTML;
    });
}

renderProducts(products);

function addOne(prodId) {
    const quantityInput = document.getElementById(`product${prodId}`).querySelector("input");
    if (quantityInput.value < maxQuantity) {
        quantityInput.value++;
        products.find(p => p.prodID === prodId).prodQuantity = quantityInput.value;
        console.log(products.find(p => p.prodID === prodId).prodQuantity);
    }
    else {
        showMaxQuantityToaster();
    }
}

function reduceOne(prodId) {
    const quantityInput = document.getElementById(`product${prodId}`).querySelector("input");
    if (quantityInput.value > minQuantity) {
        quantityInput.value--;
        products.find(p => p.prodID === prodId).prodQuantity = quantityInput.value;
        console.log(products.find(p => p.prodID === prodId).prodQuantity);
    }
    else {
        showMinQuantityToaster();
    }
}

function onQuantityInputChange(event, prodId) {
    const inputValue = event.target.value;
    const quantityInput = document.getElementById(`product${prodId}`).querySelector("input");
    if (inputValue > maxQuantity) {
        quantityInput.value = maxQuantity;
        products.find(p => p.prodID === prodId).prodQuantity = quantityInput.value;
        showMaxQuantityToaster();
        return;
    }
    if (inputValue < minQuantity) {
        quantityInput.value = minQuantity;
        products.find(p => p.prodID === prodId).prodQuantity = quantityInput.value;
        showMinQuantityToaster();
        return;
    }
    products.find(p => p.prodID === prodId).prodQuantity = quantityInput.value;
}

function preventSpecialCharacters(event) {
    const keyCode = event.keyCode || event.which;
    // 189: '-', 109: '-', 69: 'e' 190: '.'
    if (keyCode === 189 || keyCode === 109 || keyCode === 69 || keyCode === 190) {
        event.preventDefault();
    }
}

function removeProduct(prodId) {
    document.getElementById(`product${prodId}`).remove();
    const productsContainerDiv = document.querySelector(".productsContainer");
    if (productsContainerDiv.firstElementChild == null) {
        const noProductsMessageHTML = '<div>לא נשארו פריטים :)</div>';
        productsContainerDiv.innerHTML += noProductsMessageHTML;
    }
}

function toastNewProduct(prodId) {
    prodName = products.find(p => p.prodID === prodId).prodName;
    prodQuantity = products.find(p => p.prodID === prodId).prodQuantity;
    prodCost = products.find(p => p.prodID === prodId).prodCost;
    const sumPrice = prodCost * prodQuantity;
    Toastify({
        text: `${prodName}: ${prodQuantity} יחידות. סה"כ בשקלים: ₪${sumPrice.toFixed(2)}`,
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

function showMinQuantityToaster() {
    Toastify({
        text: `הכמות המינימלית בקניה היא: ${minQuantity} יח'.`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, red, #df8c8c)",
        }
    }).showToast();
}

function showMaxQuantityToaster() {
    Toastify({
        text: `הכמות המקסימלית בקניה היא: ${maxQuantity} יח'.`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, red, #df8c8c)",
        }
    }).showToast();
}