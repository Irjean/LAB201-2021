
//---------------------QUERY SELECTORS----------------------------------------

const addDateBtnPage = document.querySelector("#add-date-button-page");
const dateBackBtn = document.querySelector("#back-button-date");
const addDatePage = document.querySelector("#add-date-page");



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

//----------------------FUNCTIONS---------------------------------------------------

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

function deleteDate(date){
    db.collection("dates").doc(date).delete()
    .then(() => {
        alert("Article supprimé !");
    }).catch((error) => {
        console.error("Erreur lors de la suppression: ", error);
    });
}