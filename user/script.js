// JavaScript untuk responsif navbar
document.addEventListener('DOMContentLoaded', function () {
  // Ambil elemen-elemen yang diperlukan
  var navbarBurger = document.querySelector('.navbar-burger');
  var navbarMenu = document.querySelector('.navbar-menu');

  // Tambahkan event listener untuk mengubah tampilan navbar saat tombol hamburger diklik
  navbarBurger.addEventListener('click', function () {
      // Toggle class 'is-active' pada tombol hamburger
      navbarBurger.classList.toggle('is-active');

      // Toggle class 'is-active' pada menu navbar
      navbarMenu.classList.toggle('is-active');
  });
});

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };

