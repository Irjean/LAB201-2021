const articleImg = document.querySelector("#article-image");
const articleTitle = document.querySelector("#article-title");
const articleContent = document.querySelector("#article-content");

let imgURL = localStorage.getItem("img");
let title = localStorage.getItem("title");
let article = localStorage.getItem("article");

let imgStyle = articleImg.getAttribute("style");
articleImg.setAttribute("style", `${imgStyle} background: url(${imgURL})`);
articleTitle.innerHTML = title;
articleContent.innerHTML = article;