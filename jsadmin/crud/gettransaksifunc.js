import { get } from "https://jscroot.github.io/api/croot.js";

const URLDataTransaksi = "https://asia-southeast2-msyahid.cloudfunctions.net/GetDataTransaksi";
const tableContainer = document.getElementById("transaksi");

// Function to create a table row
function createTableRow(value) {
    const row = document.createElement("tr");
    row.className = "content is-size-6";

    const columns = ["transaksi_number", "user_phone", "formatted_time", "buktitf"];
    const labels = ["Transaksi", "No. Hp", "Waktu", "Bukti Transaksi"];

    columns.forEach((column, index) => {
        const cell = document.createElement("td");
        cell.dataset.label = `${labels[index]}`; // Use data-label attribute

        if (column === "buktitf") {
            const image = document.createElement("img");
            image.src = value[column];
            image.alt = "product";
            image.className = "product-img";
            image.width = 50;
            image.height = 50;

            // Set data-id attribute for image
            image.dataset.id = value.transaksi_number;

            // Add click event listener to show modal
            image.addEventListener("click", () => showModal(value[column], value.transaksi_number));

            cell.appendChild(image);
        } else {
            cell.textContent = value[column];
        }

        row.appendChild(cell);
    });

    return row;
}

// Function to show modal
function showModal(imageSrc, imageId) {
    const modal = document.getElementById("myModal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = imageSrc;
    modal.style.display = "block";

    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
        modal.style.display = 'none';
    });
}

// Function to handle API response
function handleApiResponse(results) {
    console.log(results);
    results.forEach(value => {
        const row = createTableRow(value);
        tableContainer.appendChild(row);
    });

    // Hide overlay when the page is fully loaded
    setTimeout(() => {
        document.getElementById('loader-wrapper').style.display = 'none';
    }, 2000);
}

// Get data from API and handle the response
get(URLDataTransaksi, handleApiResponse);
