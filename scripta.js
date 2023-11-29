document.addEventListener("DOMContentLoaded", function () {
    // Function to handle quantity increment
    function incrementQuantity(productName) {
        var quantityElement = document.getElementById(productName + "-quantity");
        var priceElement = document.getElementById(productName + "-price");

        var quantity = parseInt(quantityElement.textContent);
        var price = parseFloat(priceElement.dataset.price);

        quantity++;
        quantityElement.textContent = quantity;
        updateTotalPrice(productName, quantity, price);
    }

    // Function to handle quantity decrement
    function decrementQuantity(productName) {
        var quantityElement = document.getElementById(productName + "-quantity");
        var priceElement = document.getElementById(productName + "-price");

        var quantity = parseInt(quantityElement.textContent);
        var price = parseFloat(priceElement.dataset.price);

        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotalPrice(productName, quantity, price);
        }
    }

    // Function to update total price based on quantity
    function updateTotalPrice(productName, quantity, price) {
        var totalElement = document.getElementById(productName + "-total");
        var total = quantity * price;
        totalElement.textContent = "Total: RP. " + total.toFixed(3);
    }

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Function to redirect to donation.html with product information
    function redirectToDonationPage(productName) {
        var quantity = document.getElementById(productName + "-quantity").textContent;
        var total = document.getElementById(productName + "-total").textContent;

        window.location.href = "donation.html?product=" + productName + "&quantity=" + quantity + "&total=" + total;
    }

    // Event listeners for each product
    document.getElementById("kopiespresso-increment").addEventListener("click", function () {
        incrementQuantity("kopiespresso");
    });

    document.getElementById("kopiespresso-decrement").addEventListener("click", function () {
        decrementQuantity("kopiespresso");
    });

    document.getElementById("kopiamericano-increment").addEventListener("click", function () {
        incrementQuantity("kopiamericano");
    });

    document.getElementById("kopiamericano-decrement").addEventListener("click", function () {
        decrementQuantity("kopiamericano");
    });

    // Event listeners for Buy Now buttons
    document.getElementById("kopiespresso-buy-now").addEventListener("click", function () {
        redirectToDonationPage("kopiespresso");
    });

    document.getElementById("kopiamericano-buy-now").addEventListener("click", function () {
        redirectToDonationPage("kopiamericano");
    });

    // Add similar event listeners for other products with appropriate IDs
     // Event listeners for Kopi Aren
     document.getElementById("kopiaren-increment").addEventListener("click", function () {
        incrementQuantity("kopiaren");
    });

    document.getElementById("kopiaren-decrement").addEventListener("click", function () {
        decrementQuantity("kopiaren");
    });

    // Event listener for Kopi Aren Buy Now button
    document.getElementById("kopiaren-buy-now").addEventListener("click", function () {
        redirectToDonationPage("kopiaren");
    });

});