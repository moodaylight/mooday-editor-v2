/**
 * ================================================================
 * MOODAY V4
 * File      : scenePreview.js
 * Path      : /pages/preview/scenePreview.js
 * Module    : Scene Preview / Submit
 * Version   : V4.3
 * ================================================================
 */
(function(){
    const params=new URLSearchParams(location.search);
    const productId=params.get("product") || window.MOODAY.AppState.getProduct();
    const config=window.MOODAY.PRODUCT_CONFIG[productId] || window.MOODAY.PRODUCT_CONFIG.photoFrame;
    const state=window.MOODAY.EditorState.get();
    const frameOptions=(config.preview && config.preview.options) || [];
    const selectedId=params.get("frame") || state.frame || (frameOptions[0] && frameOptions[0].id);
    const frame=frameOptions.find(item=>item.id===selectedId) || frameOptions[0];

    window.MOODAY.AppState.setProduct(config.id);
    window.MOODAY.AppState.setPage("scenePreview");

    if(!state.imageData || !frame){
        location.replace(`preview.html?product=${encodeURIComponent(config.id)}`);
        return;
    }

    document.getElementById("productTitle").textContent=config.title;
    document.getElementById("scenePhoto").src=state.imageData;
    document.getElementById("sceneFrameImage").src=frame.image;
    document.getElementById("sceneFrameImage").alt=frame.name || "실제 액자";

    const sceneFrame=document.getElementById("sceneFrame");
    const photoWindow=document.getElementById("scenePhotoWindow");
    sceneFrame.style.aspectRatio=String(frame.aspectRatio || (frame.id==="green" ? 773/1054 : 671/894));
    photoWindow.style.left=frame.hole.left+"%";
    photoWindow.style.top=frame.hole.top+"%";
    photoWindow.style.width=frame.hole.width+"%";
    photoWindow.style.height=frame.hole.height+"%";

    const moods={original:"",warm:"sepia(.18) saturate(1.12) brightness(1.04)",cool:"saturate(.88) hue-rotate(12deg) brightness(1.03)",sunset:"sepia(.28) saturate(1.18) hue-rotate(-10deg) brightness(1.02)",night:"brightness(.78) saturate(.8) contrast(1.08)"};
    const styles={original:"",watercolor:"saturate(.85) brightness(1.08) contrast(.92)",oil:"saturate(1.22) contrast(1.08)",sand:"sepia(.22) saturate(.9) brightness(1.03)",sketch:"grayscale(.75) contrast(1.12)"};
    document.getElementById("scenePhoto").style.filter=[moods[state.mood]||"",styles[state.style]||""].filter(Boolean).join(" ");
    document.getElementById("scenePhoto").style.transform=`translate(-50%, -50%) translate(${Number(state.offsetX)||0}px,${Number(state.offsetY)||0}px) rotate(${Number(state.rotation)||0}deg) scale(${Number(state.scale)||1})`;
    window.MOODAY.EditorState.patch({frame:selectedId});

    document.getElementById("backBtn").onclick=()=>history.back();

    const submitBtn=document.getElementById("submitBtn");
    const message=document.getElementById("submitMessage");
    const orderId=params.get("orderId");
    const appState=window.MOODAY.AppState.get();
    const hasOrder=window.MOODAY.AppState.isOrderVerified() && (!orderId || orderId===appState.orderId);

    submitBtn.onclick=()=>{
        const query=`?product=${encodeURIComponent(config.id)}${orderId ? `&orderId=${encodeURIComponent(orderId)}` : ""}`;
        if(hasOrder){
            window.MOODAY.AppState.setSubmitted(true);
            location.href=`../order/submitSuccess.html${query}`;
            return;
        }
        location.href=`../order/submitPending.html${query}`;
    };
})();
