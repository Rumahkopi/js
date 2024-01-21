import { getValue } from "https://jscroot.github.io/element/croot.js";

const putData = (target_url, data, responseFunction) => {

    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const responseData = (result) => {
    hideLoadingOverlay();
    console.log("Server Response:", result, result.status);
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer : 1000,
        }).then(() => {
            window.location.href = "tables.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: result.message,
            showConfirmButton: false,
            timer : 1000,
        });
    }
}

const updateProduk = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");

    console.log("ProdukID:", _id);

    const target_url = "https://asia-southeast2-msyahid.cloudfunctions.net/UpdateDataProduk?_id=" + _id;

    const data = {
        "nama": getValue("nama"),
        "harga": getValue("harga"),
        "deskripsi": getValue("deskripsi"),
        "stok": getValue("stok"),
        "image": getValue("image"),
    };
    
    putData(target_url, data, responseData);
    showLoadingOverlay();
    console.log("Data:", data);
};

// window.updateTodo = updateTodo;

const btnUpdates = document.getElementById("btnUpdate");

// btnUpdates.addEventListener("click", updateTodo);

btnUpdates.addEventListener("click", () => {
    console.log("button aktif");
    updateProduk(); // Call pushData function when the button is clicked
  });

  function showLoadingOverlay() {
    // Show loading overlay
    document.getElementById('loader-wrapper').style.display = 'flex';
  }
  
  function hideLoadingOverlay() {
    // Hide loading overlay
    document.getElementById('loader-wrapper').style.display = 'none';
  }