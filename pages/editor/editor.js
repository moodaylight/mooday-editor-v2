/**
 * ================================================================
 * MOODAY V4
 * File      : editor.js
 * Path      : /pages/editor/editor.js
 * Module    : Editor UI
 * Version   : V4.1
 * ================================================================
 */
(function(){
    const params=new URLSearchParams(location.search);
    const productId=params.get("product") || window.MOODAY.AppState.getProduct();
    const config=window.MOODAY.PRODUCT_CONFIG[productId] || window.MOODAY.PRODUCT_CONFIG.photoFrame;
    window.MOODAY.AppState.setProduct(config.id); window.MOODAY.AppState.setPage("editor");
    window.MOODAY.EditorState.patch({product:config.id});
    const verified=params.get("verified")==="1" && window.MOODAY.AppState.isOrderVerified();

    const title=document.getElementById("productTitle");
    const img=document.getElementById("editorImage");
    const state=window.MOODAY.EditorState.get();
    title.textContent=config.title;
    if(!state.imageData){ location.replace(`upload.html?product=${encodeURIComponent(config.id)}`); return; }
    img.src=state.imageData;

    function filters(s){
        const moods={original:"",warm:"sepia(.18) saturate(1.12) brightness(1.04)",cool:"saturate(.88) hue-rotate(12deg) brightness(1.03)",sunset:"sepia(.28) saturate(1.18) hue-rotate(-10deg) brightness(1.02)",night:"brightness(.78) saturate(.8) contrast(1.08)"};
        const styles={original:"",watercolor:"saturate(.85) brightness(1.08) contrast(.92)",oil:"saturate(1.22) contrast(1.08)",sand:"sepia(.22) saturate(.9) brightness(1.03)",sketch:"grayscale(.75) contrast(1.12)"};
        return [moods[s.mood]||"",styles[s.style]||""].filter(Boolean).join(" ");
    }
    function render(){
        const s=window.MOODAY.EditorState.get();
        img.style.filter=filters(s);
        img.style.transform=`translate(${s.offsetX}px,${s.offsetY}px) rotate(${s.rotation}deg) scale(${s.scale})`;
        syncActive("moodPanel",s.mood); syncActive("stylePanel",s.style);
    }
    function syncActive(panelId,id){ document.querySelectorAll(`#${panelId} .template-card`).forEach(c=>c.classList.toggle("active",c.dataset.id===id)); }

    const tabs=[...document.querySelectorAll(".template-tab")]; const panels=[...document.querySelectorAll(".template-panel-row")];
    tabs.forEach(tab=>tab.onclick=()=>{tabs.forEach(t=>t.classList.remove("active"));panels.forEach(p=>p.classList.add("hidden"));tab.classList.add("active");document.getElementById(tab.dataset.target).classList.remove("hidden");});
    document.querySelectorAll("#moodPanel .template-card").forEach(card=>card.onclick=()=>{window.MOODAY.EditorModule.setMood(card.dataset.id);render();});
    document.querySelectorAll("#stylePanel .template-card").forEach(card=>card.onclick=()=>{window.MOODAY.EditorModule.setStyle(card.dataset.id);render();});
    document.getElementById("backBtn").onclick=()=>history.back();
    document.getElementById("nextBtn").onclick=()=>{
        const orderQuery=params.get("orderId") ? `&orderId=${encodeURIComponent(params.get("orderId"))}` : "";
        location.href=`../preview/preview.html?product=${encodeURIComponent(config.id)}${orderQuery}`;
    };

    let dragging=false,startX=0,startY=0,baseX=0,baseY=0,pinchDistance=0,pinchScale=1;
    function distance(a,b){return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);}
    const canvas=document.getElementById("canvasArea");
    canvas.addEventListener("touchstart",e=>{const s=window.MOODAY.EditorState.get();if(e.touches.length===1){dragging=true;startX=e.touches[0].clientX;startY=e.touches[0].clientY;baseX=s.offsetX;baseY=s.offsetY;}else if(e.touches.length===2){dragging=false;pinchDistance=distance(e.touches[0],e.touches[1]);pinchScale=s.scale;}},{passive:true});
    canvas.addEventListener("touchmove",e=>{const s=window.MOODAY.EditorState.get();if(e.touches.length===1&&dragging){window.MOODAY.EditorModule.setTransform({offsetX:baseX+e.touches[0].clientX-startX,offsetY:baseY+e.touches[0].clientY-startY});render();}else if(e.touches.length===2&&pinchDistance){const d=distance(e.touches[0],e.touches[1]);window.MOODAY.EditorModule.setTransform({scale:Math.min(3,Math.max(.6,pinchScale*d/pinchDistance))});render();}e.preventDefault();},{passive:false});
    canvas.addEventListener("touchend",e=>{if(e.touches.length===0)dragging=false;});

    const resumeRequested=params.get("resume")==="1";
    const draftModal=document.getElementById("draftModal");
    if(resumeRequested && verified && window.MOODAY.EditorState.hasDraft() && !window.MOODAY.AppState.isSubmitted()){
        draftModal.classList.remove("hidden");
        document.getElementById("continueDraftBtn").onclick=()=>draftModal.classList.add("hidden");
        document.getElementById("newDraftBtn").onclick=()=>{window.MOODAY.EditorState.reset(); window.MOODAY.EditorState.patch({product:config.id}); draftModal.classList.add("hidden"); location.replace(`upload.html?product=${encodeURIComponent(config.id)}`);};
    }

    render();
})();
