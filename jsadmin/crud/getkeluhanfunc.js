import {addChild } from "https://jscroot.github.io/element/croot.js";
import { get } from "https://jscroot.github.io/api/croot.js";

export let URLDataKeluhan = "https://asia-southeast2-msyahid.cloudfunctions.net/GetDataKeluhan";
export let tableTag="tr";
export let tableRowClass="content is-size-6";
export let tableTemplate=`              
<td data-label="Keluhan">#KELUHAN#</td>
<td data-label="Nohp">#NOHP#</td>
<td data-label="Waktu">#WAKTU#</td>
<td data-label="Pesan">#PESAN#</td>
` 

export function responseData(results){
    console.log(results);
    results.forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#KELUHAN#",value.complaint_number).replace("#NOHP#",value.user_phone).replace("#WAKTU#",value.formatedtime).replace("#PESAN#",value.content);
    console.log(content);
    addChild("keluhan",tableTag,tableRowClass,content);
}

get(URLDataKeluhan,responseData);

  // Menghilangkan overlay saat halaman selesai dimuat
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('loader-wrapper').style.display = 'none';
      }, 2000); // Sesuaikan timeout dengan durasi animasi CSS
    }
  };