import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

export let URLDataTransaksi = "https://asia-southeast2-msyahid.cloudfunctions.net/GetDataTransaksi";
export let tableTag="tr";
export let tableRowClass="content is-size-6";
export let tableTemplate=`              
<td data-label="NamePembeli">#NAMAPEMBELI#</td>
<td data-label="Email">#EMAIL#</td>
<td data-label="Produk">#PRODUK#</td>
<td data-label="Harga">#HARGA#</td>
<td data-label="Quantity">#QUANTITY#</td>
<td data-label="Total">#TOTAL#</td>
<td data-label="Alamat">#ALAMAT#</td>
<td data-label="Nohp">#NOHP#</td>
` 

export function responseData(results){
    console.log(results);
    results.forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#NAMAPEMBELI#",value.namapembeli).replace("#EMAIL#",value.email).replace("#PRODUK#",value.namaproduk).replace("#HARGA#",value.harga).replace("#QUANTITY#",value.quantity).replace("#TOTAL#",value.total).replace("#ALAMAT#",value.alamat).replace("#NOHP#",value.nohp);
    console.log(content);
    addChild("transaksi",tableTag,tableRowClass,content);
}
