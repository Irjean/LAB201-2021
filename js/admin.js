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
let articles = [];

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
        console.log(id, articles[id].ID)
        articles = articles.filter(i => i.ID !== Number(id));
    }
        }
})

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
        console.log(i, articles[i].ID,  "C LE DECOMPTE LA");
        if(articles[i].ID !== i){
            console.log(i, articles[i].ID,  "C PAS PAREIL");
            id = i.toString();
            break;
        }
        if((i+1) === articles.length){
            console.log("C LA FIN")
            id = (i+1).toString();
        }
    }
    console.log(id)
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