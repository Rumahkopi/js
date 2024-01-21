import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {
  // Using SweetAlert for confirmation
  Swal.fire({
      title: 'Yakin?',
      text: 'Anda akan keluar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
  }).then((result) => {
      // If the user clicks "Yes"
      if (result.isConfirmed) {
          // Delete the token cookie
          deleteCookie("token");
          // Redirect to the login page
          window.location.href = "https://rumahkopi.github.io/";
      }
  });
}

document.getElementById("button").addEventListener("click", logout)
  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };
