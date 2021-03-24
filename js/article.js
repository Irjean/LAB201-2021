const articleImg = document.querySelector("#article-img");
const articleTitle = document.querySelector("#article-title");
const article = document.querySelector("#article");

let imgURL = localStorage.getItem("img");
let title = localStorage.getItem("title");
let articleContent = localStorage.getItem("article");

let imgStyle = articleImg.getAttribute("style")
articleImg.setAttribute("style", `${imgStyle} background: url(${imgURL});`)
articleTitle.innerHTML = title;
article.innerHTML = articleContent;
