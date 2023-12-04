import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
import {URLDataTransaksi,responseData} from "./gettransaksifunc.js";


get(URLDataTransaksi,responseData);

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };