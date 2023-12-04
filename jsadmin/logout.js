import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {
    var result = confirm("yakin?");
    if (result) {
        deleteCookie("token");
        // Mengarahkan ke halaman login
        window.location.href = "https://rumahkopi.github.io/";
    }
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
