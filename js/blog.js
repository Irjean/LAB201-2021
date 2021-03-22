window.onload = () => {
    getArticleFromFirestore();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          identifyUser()
        } else {
          window.location.href = "./login.html"
        }
      });
      
};

//--------------QUERY SELECTIONS----------------------------------------------------

const blogBtn = document.querySelector("#blog-button");
const blogPage = document.querySelector("#blog");
const datesBtn = document.querySelector("#dates-button");
const datesPage = document.querySelector("#dates");
const articleList = document.querySelector("#article-list");
const addArticleBtnPage = document.querySelector("#add-article-button-page");
const addArticlePage = document.querySelector("#add-article-page");
const editArticlePage = document.querySelector("#edit-article-page");
const editArticleImg = document.querySelector("#edit-article-image");
const editPreviewImg = document.querySelector("#edit-preview-image");
const editID = document.querySelector("#edit-ID");
const editTitle = document.querySelector("#edit-article-title");
const editArticle = document.querySelector("#edit-article-article");
const editArticleBtn = document.querySelector("#edit-article-btn");
const articleBackBtn = document.querySelector("#back-button-article");
const articleImg = document.querySelector("#article-image");
const articleTitle = document.querySelector("#article-title");
const articleArticle = document.querySelector("#article-article");
const addArticleBtn = document.querySelector("#add-article-btn")
const addArticlePreviewImg = document.querySelector("#preview-img");

const userImg = document.querySelector("#user-image");
const userWelcome = document.querySelector("#user-welcome");

let user = {};
let articles = [];
let imgURL = "";

//----------------------EVENT LISTENERS--------------------------------------------



blogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
    addDatePage.classList.remove("add-date");
    editDatePage.classList.remove("edit-date-class");
});

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogPage.classList.remove("blog-class");
    datesPage.classList.add("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
})

addArticleBtnPage.addEventListener("click", () => {
    articleImg.value = "";
    addArticlePreviewImg.innerHTML = "";
    blogPage.classList.remove("blog-class");
    addArticlePage.classList.add("add-article");
})

articleBackBtn.addEventListener("click", () => {
    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
    editArticlePage.classList.remove("edit-article-class");
    articleImg.value = "";
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
        editPreviewImg.firstChild.src = image;
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
    let image = imgURL;
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

articleImg.addEventListener("change", () => {
    addArticlePreviewImg.innerHTML = '<i class="fas fa-spinner spin"></i>'
    let image = articleImg.files[0];
    let imgPath = `images/${image.name}`;
    let imageStorage = firebase.storage().ref(imgPath);
    let uploadImg = imageStorage.put(image);
    uploadImg.on("state_changed", 
    () => {
        //Pendant l'upload
        
    },
    (error) => {
        //Erreur
    },
    () => {
        //Succes
        imageStorage.getDownloadURL()
    .then((url) => {
        imgURL = url;
        addArticlePreviewImg.innerHTML = `<img height="200px" src="${imgURL}" alt="minecraft">`
    })
    })
})

editArticleImg.addEventListener("change", () => {
    editPreviewImg.innerHTML = '<i class="fas fa-spinner spin"></i>'
    let image = editArticleImg.files[0];
    let imgPath = `images/${image.name}`;
    let imageStorage = firebase.storage().ref(imgPath);
    let uploadImg = imageStorage.put(image);
    uploadImg.on("state_changed", 
    () => {
        //Pendant l'upload
        
    },
    (error) => {
        //Erreur
    },
    () => {
        //Succes
        imageStorage.getDownloadURL()
    .then((url) => {
        imgURL = url;
        editPreviewImg.innerHTML = `<img height="200px" src="${imgURL}" alt="minecraft">`
    })
    })
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
                            <td><img src="${i.image}" alt="image" width="200px"></td>
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
    
    let title = articleTitle.value;
    let article = articleArticle.value;

    db.collection("articles").doc(id || "0").set({
        ID: Number(id),
        image: imgURL,
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
        image: imgURL,
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

function sortNum(a, b){
    return a.ID - b.ID;
}

function identifyUser(){
    user = firebase.auth().currentUser;
    userEmail = user.email;
    

    db.collection("users").doc(userEmail).get()
    .then((response) => {
        let name = response.data().name;
        let role = response.data().role;
        let image = response.data().image;

        userImg.src = image
        userWelcome.innerHTML = `
        <h1  class="mb-2" style="font-size: 1.8rem;">Bienvenue ${name} !</h1>
        <span class="mb-2" style="text-align: center; font-size: 1.5rem;">${role}</span>
        `
        });
}

function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "./login.html"
      }).catch((error) => {
        // An error happened.
      });
}