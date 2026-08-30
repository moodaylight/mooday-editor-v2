(function(){
  const app=window.MOODAY && window.MOODAY.AppState;
  if(app) app.setPage('submitPending');
  document.getElementById('backBtn').onclick=()=>history.back();
})();
