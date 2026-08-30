(function(){
 const params=new URLSearchParams(location.search);
 const orderInput=document.getElementById('orderId'),phone=document.getElementById('phone'),name=document.getElementById('name'),msg=document.getElementById('message');
 if(params.get('orderId')) orderInput.value=params.get('orderId');
 if(params.get('phone')) phone.value=params.get('phone');
 if(params.get('name')) name.value=params.get('name');
 document.getElementById('backBtn').onclick=()=>history.back();
 document.getElementById('confirmBtn').onclick=()=>{
   const orderId=orderInput.value.trim(), p=phone.value.trim(), n=name.value.trim();
   if(!orderId||!p||!n){msg.textContent='주문번호, 휴대폰 번호, 성함을 모두 입력해 주세요.';return;}
   window.MOODAY.AppState.setOrder(orderId);
   window.MOODAY.AppState.setCustomer({orderId, phone:p, name:n});
   const product=params.get('product')||window.MOODAY.AppState.getProduct()||'photoFrame';
   msg.className='message success';msg.textContent='주문 정보가 확인되었습니다.';
   setTimeout(()=>location.href=`../editor/editor.html?product=${encodeURIComponent(product)}&orderId=${encodeURIComponent(orderId)}&resume=1&verified=1`,250);
 };
})();
