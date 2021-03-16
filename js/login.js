const mailInput = document.querySelector("#input-mail");
const pwInput = document.querySelector("#input-pw");
const loginBtn = document.querySelector("#login-button");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(mailInput.value, pwInput.value)
  .then((userCredential) => {
    // Signed in
    console.log("successfully logged in !");
    var user = userCredential.user;
    window.location.href = "../pages/admin.html"
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
})

