(function(){
  const products=[
    {id:"photoFrame",title:"인화지 액자",image:"../../assets/images/products/photoFrame.png"},
    {id:"artFrame",title:"아트지 액자",image:"../../assets/images/products/artFrame.png"},
    {id:"magicMirror",title:"매직미러",image:"../../assets/images/products/magicMirror.png"},
    {id:"idPhoto",title:"증명사진",image:"../../assets/images/products/idPhoto.png"},
    {id:"freeProfile",title:"무료 프로필",image:"../../assets/images/products/freeProfile.png"},
    {id:"freeWallpaper",title:"무료 배경",image:"../../assets/images/products/freeWallpaper.png"}
  ];
  document.getElementById("backBtn").onclick=()=>history.back();
  const grid=document.getElementById("productGrid");
  products.forEach(p=>{
    const card=document.createElement("button");
    card.className="product-card"; card.type="button";
    card.innerHTML=`<div class="product-icon"><img src="${p.image}" alt=""></div><div class="product-info"><p class="title">${p.title}</p></div>`;
    card.onclick=()=>location.href=`../../pages/editor/upload.html?product=${encodeURIComponent(p.id)}`;
    grid.appendChild(card);
  });
})();
