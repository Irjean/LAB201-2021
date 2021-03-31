let today = new Date();
    
  let todayDay = today.getDate();
  let todayMonth = today.getMonth();
  let todayYear = today.getFullYear();
  let todayDate = "";
  
  
  if(todayDay < 10 && todayMonth < 10){
      todayDate = `0${todayDay}-0${todayMonth+1}-${todayYear}`;
  } else if(todayDay < 10){
      todayDate = `0${todayDay}-${todayMonth+1}-${todayYear}`;
  } else if(todayMonth < 10){
      todayDate = `${todayDay}-0${todayMonth+1}-${todayYear}`;
  } else {
      todayDate = `${todayDay}-${todayMonth+1}-${todayYear}`;
  }