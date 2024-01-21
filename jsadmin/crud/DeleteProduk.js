function showLoadingOverlay() {
  // Show loading overlay
  document.getElementById('loader-wrapper').style.display = 'flex';
}

function hideLoadingOverlay() {
  // Hide loading overlay
  document.getElementById('loader-wrapper').style.display = 'none';
}

const deleteProduk = async (IDHAPUS) => {
  const _id = IDHAPUS;

  console.log("ProdukID:", _id);
  console.log("_id:", IDHAPUS);


  const isConfirmed = await Swal.fire({
    title: "Apakah Anda ingin Menghapus Data Ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Benar",
    cancelButtonText: "Tidak",
  });

  if (isConfirmed.isConfirmed) {
     // Display loading overlay
     showLoadingOverlay();
    console.log("Confirmed:", isConfirmed.isConfirmed);

    const target_url =
      "https://asia-southeast2-msyahid.cloudfunctions.net/DeleteDataProduk?_id=" + _id;

    try {
      const response = await fetch(target_url, {
        method: "DELETE",
        redirect: "follow",
      });

      if (response.ok) {
        hideLoadingOverlay();
        console.log("Response:", response);
        await Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus",
          showConfirmButton: false,
          timer : 1000,
        });
        location.reload();
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

window.deleteProduk = deleteProduk;