import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
export let URLPost = `https://asia-southeast2-msyahid.cloudfunctions.net/InsertDataProduk`
export let token = 'token';

function showLoadingOverlay() {
    // Show loading overlay
    document.getElementById('loader-wrapper').style.display = 'flex';
  }
  
  function hideLoadingOverlay() {
    // Hide loading overlay
    document.getElementById('loader-wrapper').style.display = 'none';
  }

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Display loading overlay
        showLoadingOverlay();
        let data = GetDataForm();
        postWithBearer(URLPost, token, data, ResponsePost)
    });
});

    export function GetDataForm(){
        const nama = document.querySelector("#nama").value;
        const harga = document.querySelector("#harga").value;
        const deskripsi = document.querySelector("#deskripsi").value;
        const stok = document.querySelector("#stok").value;
        const image = document.querySelector("#image").value;
        console.log(nama)
    
        const data = {
            nama: nama,
            harga: harga,
            deskripsi: deskripsi,
            stok : stok,
            image : image,
        };
        return data
    }
    
    export function ResponsePost (result) {
      hideLoadingOverlay();
      if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Insert Successful",
            showConfirmButton: false,
            timer : 1000,
        }).then(() => {
            window.location.href = "/admin/page/tables.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Insert Failed",
            text: result.message,
            showConfirmButton: false,
            timer : 2000,
        });
    }
}

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };

