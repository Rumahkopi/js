import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp(){
    let target_url = "https://asia-southeast2-msyahid.cloudfunctions.net/LoginAdmin";
    let tokenkey = "token";
    let tokenvalue = "5804dcddb5fd6f93a97c9541e21eb668beafc993e5115f77152e191f08da15e2"; 
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }

    postWithToken(target_url,tokenkey,tokenvalue,datainjson,responseData);

}
function responseData(result) {
    setInner("pesan", result.message);
    setCookieWithExpireHour("token", result.token, 2);
    
    if (result.message === "Selamat Datang") {
        // Jika pesan adalah "Selamat Datang", arahkan ke halaman dashboard.
        window.location.href = "../admin/page/index.html"; // Gantilah "error.html" dengan halaman error yang sesuai.
    } else if (result.message === "Password Salah") {
        // Jika pesan kesalahan adalah "Password salah", arahkan ke halaman error.
        window.location.href = "404.html";
    } else {
        // Penanganan lainnya (pesan kesalahan lainnya)
        window.location.href = "login.html";
    }
}