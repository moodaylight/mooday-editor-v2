(function(){
  const app=window.MOODAY && window.MOODAY.AppState;
  if(app) app.setPage('submitSuccess');
  const btn=document.getElementById('moreProductsBtn');
  if(btn) btn.onclick=()=>location.href='submitSuccess.html';
})();
