//--------------QUERY SELECTIONS----------------------------------------------------
window.onload = () => {
    getArticleFromFirestore();
};
const blogBtn = document.querySelector("#blog-button");
const blogPage = document.querySelector("#blog");
const datesBtn = document.querySelector("#dates-button");
const datesPage = document.querySelector("#dates");
const articleList = document.querySelector("#article-list");
const addArticleBtnPage = document.querySelector("#add-article-button-page");
const addArticlePage = document.querySelector("#add-article-page");
const editArticlePage = document.querySelector("#edit-article-page");
const editID = document.querySelector("#edit-ID");
const editTitle = document.querySelector("#edit-article-title");
const editArticle = document.querySelector("#edit-article-article");
const editArticleBtn = document.querySelector("#edit-article-btn");
const articleBackBtn = document.querySelector("#back-button-article");
const articleImg = document.querySelector("#article-image");
const articleTitle = document.querySelector("#article-title");
const articleArticle = document.querySelector("#article-article");
const addArticleBtn = document.querySelector("#add-article-btn");
let articles = [];

//----------------------EVENT LISTENERS--------------------------------------------



blogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
});

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.remove("blog-class");
    datesPage.classList.add("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
})

addArticleBtnPage.addEventListener("click", () => {
    blogPage.classList.remove("blog-class");
    addArticlePage.classList.add("add-article");
})

articleBackBtn.addEventListener("click", () => {
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
})

addArticleBtn.addEventListener("click", addNewArticle);

blogPage.addEventListener("click", (e)=>{
    let id = e.target.value;
    if(e.target.id === "delete-button"){
        if(confirm("Voulez-vous vraiment supprimer l'article ?")){
          db.collection("articles").doc(id).delete()
        .then(() => {
            alert("Article supprimé !");
        }).catch((error) => {
            alert("L'article n'a pas pu être supprimé : ", error);
        }); 
        e.target.parentNode.parentNode.remove();
        articles = articles.filter(i => i.ID !== Number(id));
    }
        }
    if(e.target.id === "edit-button"){
        
        let id = e.target.value;
        let title = articles[id].titre;
        let image = articles[id].image;
        let article = articles[id].article;

        editID.innerHTML = id;
        editTitle.value = title;
        editArticle.value = article;
        
        blogPage.classList.remove("blog-class");
        editArticlePage.classList.add("edit-article-class");
    }
})

editArticlePage.addEventListener("click", (e) => {
    if(e.target.id === "back-button-article"){
        blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
    }
})

editArticleBtn.addEventListener("click", () => {
    let id = editID.innerHTML;
    let image = "image";
    let title = editTitle.value;
    let article = editArticle.value;

    articles[id] = {
        ID: Number(id),
        image: image,
        titre: title,
        article: article
    }

    db.collection("articles").doc(`${id}`).set({
        ID: Number(id),
        image: image,
        titre: title,
        article: article
    })
    .then(() => {
        alert("Article modifié avec succés !");
    })
    .catch((error) => {
        alert("Erreur lors de la modification de l'article: ", error);
    });

    let html = showArticles(articles);
    articleList.innerHTML = "";
    articleList.innerHTML += html;

    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");

    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
})

//----------------FUNCTIONS----------------------------------------------------

function getArticleFromFirestore(){
    docRef = db.collection("articles").orderBy("ID", "asc");
    docRef.get().then((querySnapshot) => {
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
                            <td><button value="${i.ID}" id="edit-button" class="button btn-outline-info p-1 m-1">Edit</button><button value="${i.ID}" id="delete-button" class="button btn-outline-danger p-1">Delete</button></td>
                        </tr>
        `;
    }).join("");
};

function addNewArticle(){
    let id = 0;
    for(let i = 0; i < articles.length; i++){
        if(articles[i].ID !== i){
            id = i.toString();
            break;
        }
        if((i+1) === articles.length){
            id = (i+1).toString();
        }
    }
    let image = "image";
    let title = articleTitle.value;
    let article = articleArticle.value;

    db.collection("articles").doc(id || "0").set({
        ID: Number(id),
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
        ID: Number(id),
        image: image,
        titre: title,
        article: article
    }

    articles.sort(sortNum);

    let html = showArticles(articles);
    articleList.innerHTML = "";
    articleList.innerHTML += html;

    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
}

function deleteArticle(articleIDnum){

    let articleID = articleIDnum.toString();

    db.collection("cities").doc(articleID).delete()
    .then(() => {
        alert("Article supprimé !");
    }).catch((error) => {
        console.error("Erreur lors de la suppression: ", error);
    });
}

function sortNum(a, b){
    return a.ID - b.ID;
}