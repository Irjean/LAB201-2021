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
// Add New Article Page
const articleBackBtn = document.querySelector("#back-button-article");
const articleDate = document.querySelector("#article-date");
const articleImg = document.querySelector("#article-image");
const articleTitle = document.querySelector("#article-title");
const articleArticle = document.querySelector("#article-article");
const addArticleBtn = document.querySelector("#add-article-btn")
const addArticlePreviewImg = document.querySelector("#preview-img");
// Edit Article Page
const editArticlePage = document.querySelector("#edit-article-page");
const editArticleImg = document.querySelector("#edit-article-image");
const editPreviewImg = document.querySelector("#edit-preview-image");
const editID = document.querySelector("#edit-ID");
const editTitle = document.querySelector("#edit-article-title");
const editArticle = document.querySelector("#edit-article-article");
const editArticleBtn = document.querySelector("#edit-article-btn");
//Preview Page
const addPreview = document.querySelector("#add-article-preview");


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
    articleDate.innerHTML = todayDate;
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
    let date = e.target.value;
    if(e.target.id === "delete-button"){
        if(confirm("Voulez-vous vraiment supprimer l'article ?")){
          db.collection("articles").doc(date).delete()
        .then(() => {
            alert("Article supprimé !");
        }).catch((error) => {
            alert("L'article n'a pas pu être supprimé : ", error);
        }); 
        e.target.parentNode.parentNode.parentNode.remove();
        articles = articles.filter(i => i.date !== date)
    }
        }
    if(e.target.id === "edit-button"){
        
        let date = e.target.value;
        let title = e.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
        imageURL = e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].src;
        let article = "";

        db.collection("articles").doc(date).get()
        .then((response) => {
            article = response.data().article
            editID.innerHTML = date;
            editPreviewImg.firstChild.src = imageURL;
            editTitle.value = title;
            editArticle.value = article
        
            blogPage.classList.remove("blog-class");
            editArticlePage.classList.add("edit-article-class");
        })

        
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
    let date = editID.innerHTML;
    let image = imgURL;
    let title = editTitle.value;
    let article = editArticle.value;

    db.collection("articles").doc(`${date}`).set({
        date: date,
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

    articleList.innerHTML = "";
    getArticleFromFirestore()

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

addPreview.addEventListener("click", () => {
    let title = articleTitle.value;
    let article = articleArticle.value;

    localStorage.setItem("img", imgURL);
    localStorage.setItem("title", title);
    localStorage.setItem("article", article);
    window.location = "./article.html"
})

//----------------FUNCTIONS----------------------------------------------------

function getArticleFromFirestore(){
    articles = [];
    docRef = db.collection("articles");
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
        <tr style="height: 100px; overflow: hidden;">
                            <td width="100px">${i.date}</td>
                            <td width="210px"><img src="${i.image}" alt="image" width="200px"></td>
                            <td width="735px">${i.titre}</td>
                            <td><div class="d-flex flex-column mt-3" style="margin-right: 4px"><button value="${i.date}" id="edit-button" class="button btn-success p-1 m-auto mb-2" style="width: 74px;">EDIT</button><button value="${i.date}" id="delete-button" class="button btn-danger p-1 m-auto" style="width: 74px;">DELETE</button></div></td>
                        </tr>
        `;
    }).join("");
};

function addNewArticle(){
    
    let title = articleTitle.value;
    let article = articleArticle.value;

    db.collection("articles").doc(todayDate).set({
        date: todayDate,
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

    articleList.innerHTML = "";
    getArticleFromFirestore();

    blogPage.classList.add("blog-class");
    datesPage.classList.remove("dates-class");
    addArticlePage.classList.remove("add-article");
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
        <h1 class="mb-2" style="font-size: 1.8rem;">Bienvenue ${name} !</h1>
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

//-----------------------------JQUERY------------------------------------------------------------------

const button = $("#gras");

button.on("click", () => {
    console.log("click")
$("#article-article").replaceWith(`<textarea id="article-article" style="height: 300px; text-align: start; margin-bottom: 10px; text-align: center;" type="text" autocomplete="off">${getSelectionText()}</textarea>`)
})
function getSelectionText() {
  if (window.getSelection) {
    try {
        console.log("eheh")
      var ta = $("#article-article").get(0);
      let str = ta.value
      let selText = ta.value.substring(ta.selectionStart, ta.selectionEnd);
      console.log(selText, str)
      return str.replace(selText, `<bold>${selText}</bold>`)
    } catch (e) {
      console.log('Cant get selection text')
    }
  }
}