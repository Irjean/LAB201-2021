const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const cross = document.querySelector(".cross");


menuBtn.addEventListener("click", ()=>{
        header.classList.toggle("open");
});

cross.addEventListener("click", ()=>{
    header.classList.toggle("open");
});