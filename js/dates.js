setTimeout(getDatesFromFirestore(), "5000")

//---------------------QUERY SELECTORS----------------------------------------

const dateList = document.querySelector("#date-list");
const addDateBtnPage = document.querySelector("#add-date-button-page");
const dateBackBtn = document.querySelector("#back-button-date");
const addDatePage = document.querySelector("#add-date-page");

const dateDate = document.querySelector("#date-date");
const datePlace = document.querySelector("#date-place");
const addDateBtn = document.querySelector("#add-date-btn");

const editDateBtn = document.querySelector("#edit-date-btn");
const editDatePage = document.querySelector("#edit-date-page");
const editDate = document.querySelector("#edit-date");
const editPlace = document.querySelector("#edit-date-place");

let today = new Date();
    
  let todayDay = today.getDate();
  let todayMonth = today.getMonth();
  let todayYear = today.getFullYear();
  let todayDate = "";
  
  
  if(todayDay < 10 && todayMonth < 10){
      todayDate = `${todayYear}-0${todayMonth+1}-0${todayDay}`;
  } else if(todayDay < 10){
      todayDate = `${todayYear}-${todayMonth+1}-0${todayDay}`;
  } else if(todayMonth < 10){
      todayDate = `${todayYear}-0${todayMonth+1}-${todayDay}`;
  } else {
      todayDate = `${todayYear}-${todayMonth+1}-${todayDay}`;
  }

let dates = [];

//---------------------EVENT LISTENERS-------------------------------------------

addDateBtnPage.addEventListener("click", () => {
    datesPage.classList.remove("dates-class");
    addDatePage.classList.add("add-date");

    dateDate.setAttribute("min", todayDate);
});

datesPage.addEventListener("click", (e)=>{
    let date = e.target.value;
    if(e.target.id === "delete-button"){
        if(confirm("Voulez-vous vraiment supprimer cette date ?")){
            deleteDate(date);
        e.target.parentNode.parentNode.parentNode.remove();
        dates = dates.filter(i => i.date !== date);
        }
     }
     if(e.target.id === "edit-button"){
        
        let date = e.target.value.split(" ")[0];
        let getPlace = e.target.value.split(" ");
        getPlace.shift();
        let place = getPlace.join(" ");

        editDate.innerHTML = date;
        editPlace.value = place;

        datesPage.classList.remove("dates-class");
        editDatePage.classList.add("edit-date-class");

        dates = [];
        dateList.innerHTML = "";
        getDatesFromFirestore()
    }
})

editDateBtn.addEventListener("click", () => {
    let date = editDate.innerHTML;
    let place = editPlace.value;

    db.collection("dates").doc(`${date}`).set({
        date: date,
        place: place
    })
    .then(() => {
        alert("Date modifié avec succés !");
        
    })
    .catch((error) => {
        alert("Erreur lors de la modification de la date: ", error);
    });

    datesPage.classList.add("dates-class");
    editDatePage.classList.remove("edit-date-class");
})

//----------------------FUNCTIONS---------------------------------------------------

function getDatesFromFirestore(){
    docRef = db.collection("dates");
    docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            dates.push(data);
        });
        let html = showDates(dates)
        dateList.innerHTML += html;
    });
}

function showDates(dates){
    return dates.map(i => {
         return `
         <tr>
                             <td>${i.date}</td>
                             <td>${i.place}</td>
                             <td><div class="d-flex flex-column" style="margin-right: 4px"><button value="${i.date} ${i.place}" id="edit-button" class="button btn-success p-1 m-auto mb-2" style="width: 74px;"">Edit</button><button value="${i.date}" id="delete-button" class="button btn-danger p-1 m-auto" style="width: 74px;">Delete</button></div></td>
                         </tr>
         `;
     }).join("");
}

function backDateButton(){
    blogPage.classList.remove("blog-class");
    datesPage.classList.add("dates-class");
    addDatePage.classList.remove("add-date");
    editDatePage.classList.remove("edit-date-class");
}

function addNewDate(){

    let dateValue = dateDate.value;
    let place = datePlace.value;

    db.collection("dates").doc(`${dateValue}`).set({
        date: dateValue,
        place: place
    })
    .then(() => {
        alert("Date ajouté avec succés !");
        
    })
    .catch((error) => {
        alert("Erreur lors de l'ajout de la date: ", error);
    });

    dateDate.value = "";
    datePlace.value = "";

    dateList.innerHTML = "";
    getDatesFromFirestore()
}

function deleteDate(date){
    db.collection("dates").doc(date).delete()
    .then(() => {
        alert("Article supprimé !");
    }).catch((error) => {
        console.error("Erreur lors de la suppression: ", error);
    });
}