import { isiData } from "./EditProduk.js";

const urlParams = new URLSearchParams(window.location.search);
// console.log("urlParams:", urlParams);
const _id = urlParams.get("_id");

// console.log("todoID:", _id);

const urlFetch = "https://asia-southeast2-msyahid.cloudfunctions.net/GetOneProduk?_id=" + _id;

function getTodoByID(target_url, responseFunction) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

getTodoByID(urlFetch, isiData);