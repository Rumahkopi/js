const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// let's cart
let cart = [];

// buttons
let buttonsDOM = [];

// TODO: getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("https://asia-southeast2-msyahid.cloudfunctions.net/GetDataProduk");
      let data = await result.json();

      let products = data;
      products = products.map((item) => {
        const { _id, nama, harga, deskripsi, stok, image } = item;

        return { id: _id, title: nama, price: harga, description: deskripsi, stok: stok , image: image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// TODO: display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
         // Check if product is in stock
    const isInStock = product.stok > 0;
      result += `
        <!-- single product start -->
        <article class="product">
          <div class="img-container">
            <img src=${product.image} alt="product" class="product-img"/>  
            <button class="bag-btn" data-id=${product.id} ${isInStock ? '' : 'disabled'}>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            ${isInStock ? 'add to cart' : 'out of stock'}
          </button> 
            <button class="view-btn" data-id=${product.id}>
            <i class="fa fa-eye" aria-hidden="true"></i>
            view
          </button>      
          </div>
          <h3>${product.title}</h3>
          <h3>Stok :${product.stok}</h3>
          <h4 class="label">Price: Rp. ${product.price}</h4>
        </article>
        <!-- single product end -->`;
    });

    try {
      productsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }

  viewProductDetails(product) {
    const modal = document.getElementById("myModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalStok = document.getElementById("modal-stok");
    const modalImage = document.getElementById("modal-image");
    const modalPrice = document.getElementById("modal-price");

    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalStok.textContent = `Stock : ${product.stok}`;
    modalImage.src = product.image;
    modalPrice.textContent = `Price : Rp. ${product.price}`;

    // Display the modal
    modal.style.display = "block";

    // Close modal when the close button is clicked
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  updateTotalProducts() {
    const totalProductsInput = document.getElementById('totalProducts');
    const productNamesInput = document.getElementById('productNames');

    // Reset the previous content
    productNamesInput.value = '';

    // Update total products count
    const totalProducts = cart.reduce((total, item) => {
        // Append each product name and count to the input field
        productNamesInput.value += `${item.title} x ${item.amount}, `;

        return total + item.amount;
    }, 0);

    totalProductsInput.value = totalProducts;
}
getBagButtons() {
  const buttons = [...document.querySelectorAll(".bag-btn")];
  buttonsDOM = buttons;

  buttons.forEach((button) => {
    let id = button.dataset.id;
    let inCart = cart.find((item) => item.id === id);

    if (inCart) {
      button.innerText = "In Cart";
      button.disabled = true;
    } else {
      button.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disabled = true;

        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, cartItem];
        Storage.saveCart(cart);
        this.setCartValues(cart);
        this.addCartItem(cartItem);
        this.showCart();
      });
    }

    // View button event listener
// View button event listener
const viewButton = button.parentElement.querySelector(".view-btn");

// Tambahkan event listener mouseover untuk menampilkan tombol "View"
button.parentElement.addEventListener("mouseover", () => {
  viewButton.style.opacity = 1; // Set opacity to 1 to make it visible
});

// Tambahkan event listener mouseout untuk menyembunyikan tombol "View"
button.parentElement.addEventListener("mouseout", () => {
  viewButton.style.opacity = 0; // Set opacity to 0 to make it invisible
});

// Set initial opacity to 0 for the "View" button
viewButton.style.opacity = 0;

// Tambahkan event listener mouseout untuk menyembunyikan tombol "View"
button.parentElement.addEventListener("mouseout", () => {
  viewButton.style.opacity = 0; // Set opacity to 0 to make it invisible
});

// Set initial opacity to 0 for the "View" button
viewButton.style.opacity = 0;

// View button event listener
viewButton.addEventListener("click", () => {
  const id = viewButton.dataset.id;
  const product = Storage.getProduct(id);
  this.viewProductDetails(product);
});
  });
}

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;

    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });

    cartTotal.innerText = parseFloat(tempTotal.toFixed(3)).toFixed(3);
    cartItems.innerText = itemsTotal.toFixed(0);
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `<img src=${item.image} alt="product" />
      <div>
        <h4>${item.title}</h4>
        <h5>Price : Rp. ${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>Remove</span>
      </div>
      <div>
        <i class="fa fa-chevron-up" aria-hidden="true" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fa fa-chevron-down" aria-hidden="true" data-id=${item.id}></i>
      </div>`;

    cartContent.appendChild(div);
    this.updateTotalProducts();
  }

  checkoutAll() {
    const productDetails = cart.reduce((msg, item) => {
      return msg + `${item.title} (${item.amount}), `;
    }, "");
  
    const totalQuantity = cart.reduce((total, item) => total + item.amount, 0);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.amount, 0).toFixed(3);
    const customerName = document.getElementById('nama').value;
    const customerAddress = document.getElementById('alamat').value;
    const customerPhoneNumber = document.getElementById('nohp').value;
  
    const message = `Order : \nSaya Ingin Beli Semua Produk Ini :\nProduk : ${productDetails}\nTotal Jumlah Barang : ${totalQuantity}\nTotal Keseluruhan : Rp. ${totalAmount}\n\nInformasi Customer :\nNama : ${customerName}\nAlamat/Meja: ${customerAddress}\nNo. Hp : ${customerPhoneNumber}`;
  
    const encodedMessage = encodeURIComponent(message);
  
    // Replace the following phone number with your own WhatsApp business number
    const phoneNumber = "6285716349516";
  
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    window.open(whatsappLink, "_blank");
  }
  
  
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }

  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);

    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);

      // Add event listener for the new Checkout All button
      const checkoutAllBtn = document.querySelector(".checkout-all-btn");
      if (checkoutAllBtn) {
        checkoutAllBtn.addEventListener("click", () => this.checkoutAll());
      }
        // Add event listener to close the modal when the close button is clicked
      const closeModalButton = document.querySelector(".close-modal");
      if (closeModalButton) {
        closeModalButton.addEventListener("click", () => this.closeModal());
      }
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  cartLogic() {
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });

    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
        this.updateTotalProducts();
      } else if (event.target.classList.contains("fa-chevron-up")) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        this.updateTotalProducts();
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        this.updateTotalProducts();
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));

    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);

    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    this.updateTotalProducts();
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// TODO: local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();

    });
  });
