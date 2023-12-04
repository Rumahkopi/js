import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

export let URLDataProduk = "https://asia-southeast2-msyahid.cloudfunctions.net/GetDataProduk";
export let tableTag="tr";
export let tableRowClass="content is-size-6";
export let tableTemplate=`
<td>                
<label class="checkbox">
  <input  class="checkbox" type="checkbox">
</label>
</td>
<td data-label="Name">#NAMA#</td>
<td data-label="Harga">#HARGA#</td>
<td data-label="Deskripsi">#DESKRIPSI#</td>
<td data-label="Stok">#STOK#</td>
` 

export function responseData(results){
    console.log(results);
    results.forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#NAMA#",value.nama).replace("#HARGA#",value.harga).replace("#DESKRIPSI#",value.deskripsi).replace("#STOK#",value.stok);
    console.log(content);
    addChild("produk",tableTag,tableRowClass,content);
}

/* Modal: open */
Array.from(document.getElementsByClassName('jb-modal')).forEach(el => {
    el.addEventListener('click', e => {
      const modalTarget = e.currentTarget.getAttribute('data-target')
  
      document.getElementById(modalTarget).classList.add('is-active')
      document.documentElement.classList.add('is-clipped')
    })
  });
  
  /* Modal: close */
  Array.from(document.getElementsByClassName('jb-modal-close')).forEach(el => {
    el.addEventListener('click', e => {
      e.currentTarget.closest('.modal').classList.remove('is-active')
      document.documentElement.classList.remove('is-clipped')
    })
  })