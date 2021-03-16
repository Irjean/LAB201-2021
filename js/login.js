const mailInput = document.querySelector("#input-mail");
const pwInput = document.querySelector("#input-pw");
const loginBtn = document.querySelector("#login-button");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login(mailInput.value, loginBtn.value);
})

function login(email, password){
    console.log("ici c bon");
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("successfully logged in !");
    var user = userCredential.user;
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}