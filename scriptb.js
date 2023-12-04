  // Retrieve selected product data from localStorage
    var selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Display product information on the checkout page
    document.getElementById('productName').value = selectedProduct.name;
    document.getElementById('productPrice').value = selectedProduct.price;
    document.getElementById('productQuantity').value = selectedProduct.quantity;
    document.getElementById('productTotal').value = selectedProduct.total;