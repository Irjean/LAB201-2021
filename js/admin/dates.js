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