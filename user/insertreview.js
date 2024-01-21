import { postWithBearer } from "https://jscroot.github.io/api/croot.js";

export let URLPost = `https://asia-southeast2-msyahid.cloudfunctions.net/InsertPesanReview`
let token = "token";

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
        const nama = document.querySelector("#namapereview").value;
        const subjek = document.querySelector("#subjek").value;
        const pesan = document.querySelector("#pesan").value;
        console.log(nama)
    
        const data = {
            nama: nama,
            subjek: subjek,
            pesan: pesan,

        };
        return data
    }
    
    function showLoadingOverlay() {
        // Show loading overlay
        document.getElementById('loader-wrapper').style.display = 'flex';
      }
      
      function hideLoadingOverlay() {
        // Hide loading overlay
        document.getElementById('loader-wrapper').style.display = 'none';
      }

    export function ResponsePost (result) {
        hideLoadingOverlay();
        console.log(result,result.status)
      if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Terimakasih Telah Mengirimkan Pesan Kepada Kami.",
            confirmButtonColor: '#000',
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Gagal Coba Lagi",
            text: result.message,
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

