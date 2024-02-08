import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const checkTokenAndRedirect = () => {
    const token = "token";
    const tokenValue = getCookie(token);

    if (!tokenValue) {
        window.location.href = "https://rumahkopi.thomyy.my.id/login.html";
    }
}

window.onload = checkTokenAndRedirect;