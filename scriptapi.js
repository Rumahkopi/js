document.addEventListener('DOMContentLoaded', function () {
    // Fetch the daily quote from the API
    fetch('https://api.lolhuman.xyz/api/random/katabijak?apikey=bijikuda')
        .then(response => response.json())
        .then(data => {
            // Update the content of the paragraph with the daily quote quote hari ini
            document.getElementById('daily-quote').textContent = `kata - kata hari ini : ${data.result}`;
        })
        .catch(error => console.error('Error fetching daily quote:', error));
});
    // Menghilangkan animasi loading dan menampilkan konten utama setelah 3 detik
    setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
      }, 1500); 