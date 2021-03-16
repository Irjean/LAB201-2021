const blogBtn = document.querySelector("#blog-button");
const blogPage = document.querySelector("#blog");
const datesBtn = document.querySelector("#dates-button");
const datesPage = document.querySelector("#dates");

blogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
});

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    datesPage.classList.add("dates-class");
    blogPage.classList.remove("blog-class");
})

const fileInput = document.querySelector("#file-input");
const imgBtn = document.querySelector("#image-button");
const showImg = document.querySelector("#afficher-image");

imgBtn.addEventListener("click", ()=>{
    let image = document.createElement("img");
    image.setAttribute("style", "width: 10%;")
    image.src = window.URL.createObjectURL(fileInput.files[0]);
    showImg.appendChild(image);
})
