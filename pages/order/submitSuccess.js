(function(){
  const app=window.MOODAY && window.MOODAY.AppState;
  if(app) app.setPage('submitSuccess');
  document.getElementById('backBtn').onclick=()=>history.back();
  const products=[
    ['photoFrame','인화지 액자','../../assets/images/products/photoFrame.png'],
    ['artFrame','아트지 액자','../../assets/images/products/artFrame.png'],
    ['magicMirror','매직미러','../../assets/images/products/magicMirror.png'],
    ['idPhoto','증명사진','../../assets/images/products/idPhoto.png'],
    ['freeProfile','무료 프로필','../../assets/images/products/freeProfile.png'],
    ['freeWallpaper','무료 배경','../../assets/images/products/freeWallpaper.png']
  ];
  const row=document.getElementById('productRow');
  products.forEach(([id,title,image])=>{
    const a=document.createElement('button'); a.type='button'; a.className='product-item';
    a.innerHTML=`<img src="${image}" alt=""><span>${title}</span>`;
    a.onclick=()=>location.href=`../editor/upload.html?product=${encodeURIComponent(id)}`;
    row.appendChild(a);
  });
})();
