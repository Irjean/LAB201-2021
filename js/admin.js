const blogBtn = document.querySelector("#blog-button");
const blogPage = document.querySelector("#blog");
const datesBtn = document.querySelector("#dates-button");
const datesPage = document.querySelector("#dates");
const articleList = document.querySelector("#article-list");
const addArticleBtnPage = document.querySelector("#add-article-button-page");
const addArticlePage = document.querySelector("#add-article-page");
const articleBackBtn = document.querySelector("#back-button-article");
const articleImg = document.querySelector("#article-image");
const articleTitle = document.querySelector("#article-title");
const articleArticle = document.querySelector("#article-article");
const addArticleBtn = document.querySelector("#add-article-btn");
const articles = [];

window.onload = () => {
    getArticleFromFirestore();
};

blogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
});

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    datesPage.classList.add("dates-class");
    blogPage.classList.remove("blog-class");
    addArticlePage.classList.remove("add-article");
})

addArticleBtnPage.addEventListener("click", () => {
    blogPage.classList.remove("blog-class");
    addArticlePage.classList.add("add-article");
})

articleBackBtn.addEventListener("click", () => {
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
})

addArticleBtn.addEventListener("click", addNewArticle);

blogPage.addEventListener("click", (e)=>{
    console.log(e)
})

function getArticleFromFirestore(){
    db.collection("articles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            articles.push(data);
        });
        let html = showArticles(articles)
        articleList.innerHTML += html;
    });
}

function showArticles(articles){
   return articles.map(i => {
        return `
        <tr>
                            <td>${i.ID}</td>
                            <td>${i.image}</td>
                            <td>${i.titre}</td>
                            <td>${i.article}</td>
                            <td><button id="edit-button" class="button btn-outline-info p-1 mb-1">Edit</button><button id="delete-button" class="button btn-outline-danger p-1">Delete</button></td>
                        </tr>
        `;
    }).join("");
};

function updateArticleList(id, image, titre, article){
    return `
        <tr id="article">
                            <td>${id}</td>
                            <td>${image}</td>
                            <td>${titre}</td>
                            <td>${article}</td>
                            <td><button class="button btn-outline-info p-1 mb-1">Edit</button><button class="button btn-outline-danger p-1">Delete</button></td>
                        </tr>
        `;
}

function addNewArticle(){
    console.log(articles.length)
    let id = articles.length.toString();
    let image = "image";
    let title = articleTitle.value;
    let article = articleArticle.value;

    db.collection("articles").doc(id).set({
        ID: articles.length,
        image: image,
        titre: title,
        article: article
    })
    .then(() => {
        alert("Article créé avec succés !");
    })
    .catch((error) => {
        alert("Erreur lors de la création de l'article: ", error);
    });

    articleTitle.value = "";
    articleArticle.value = "";

    articles[articles.length] = {
        ID: article.length,
        image: image,
        titre: title,
        article: article
    }

    let html = updateArticleList(id, image, title, article);
    articleList.innerHTML += html;

    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
}