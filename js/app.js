const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const cross = document.querySelector(".cross");
const cookie = document.querySelector(".cookie");
const cookieBtn = document.querySelector(".cookie-btn");

menuBtn.addEventListener("click", ()=>{
        header.classList.toggle("open");
});

cross.addEventListener("click", ()=>{
    header.classList.toggle("open");
});

cookieBtn.addEventListener("click", () => {
    cookie.classList.add("hidden");
    localStorage.setItem("cookie", true);
});

function getCookie(){
    if(localStorage.getItem("cookie") != null){
    let acceptedCookie = localStorage.getItem("cookie");
    showCookie(acceptedCookie)
} else {
    let acceptedCookie = false;
    showCookie(acceptedCookie)
    }
}

function showCookie(cookies){
    if(cookies === false){
        cookie.classList.remove("hidden");
    }
}


getCookie()