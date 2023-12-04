function changeQuantity(id, change) {
    var quantityElement = document.getElementById('quantity' + id.charAt(id.length - 1));
    var hargaElement = document.getElementById(id);
    var totalElement = document.getElementById('total' + id.charAt(id.length - 1));

    var quantity = parseInt(quantityElement.innerText) + change;

    if (quantity >= 1) {
        quantityElement.innerText = quantity;
        totalElement.innerText = parseInt(hargaElement.innerText) * quantity;
    }
}

function buyNow(productName, hargaId, totalId) {
    var hargaElement = document.getElementById(hargaId);
    var totalElement = document.getElementById(totalId);
    
    var price = parseInt(hargaElement.innerText);
    var quantity = parseInt(document.getElementById('quantity' + totalId.charAt(totalId.length - 1)).innerText);
    var total = price * quantity;

    // Store product data in localStorage
    var productData = {
        name: productName,
        price: price,
        quantity: quantity,
        total: total
    };
    localStorage.setItem('selectedProduct', JSON.stringify(productData));

    window.location.href = "checkout.html";
}