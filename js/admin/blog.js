window.onload = () => {
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
const datesBtn = document.querySelector("#dates-button");
const addArticleBtnPage = document.querySelector("#add-article-button-page");
const addArticlePage = document.querySelector("#add-article-page");
const userImg = document.querySelector("#user-image");
const userWelcome = document.querySelector("#user-welcome");

let currLocation = "";
let user = {};
let articles = [];
let imgURL = "";

//----------------------EVENT LISTENERS--------------------------------------------

blogBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(window.location != currLocation){
        console.log('ça passe');
    //    window.location.href = "./adminBlog.html"
    }
    
})

datesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./adminDate.html"
})

//----------------FUNCTIONS----------------------------------------------------



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