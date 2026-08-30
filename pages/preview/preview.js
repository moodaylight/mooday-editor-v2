/**
 * ================================================================
 * MOODAY V4
 * File      : preview.js
 * Path      : /pages/preview/preview.js
 * Module    : Product Preview / Frame Selection
 * Version   : V4.3
 * ================================================================
 */
(function(){
    const params=new URLSearchParams(location.search);
    const productId=params.get("product") || window.MOODAY.AppState.getProduct();
    const config=window.MOODAY.PRODUCT_CONFIG[productId] || window.MOODAY.PRODUCT_CONFIG.photoFrame;
    const state=window.MOODAY.EditorState.get();

    window.MOODAY.AppState.setProduct(config.id);
    window.MOODAY.AppState.setPage("preview");

    if(!state.imageData){
        location.replace(`../editor/upload.html?product=${encodeURIComponent(config.id)}`);
        return;
    }

    const title=document.getElementById("productTitle");
    const frameStack=document.getElementById("frameStack");
    const photoWindow=document.getElementById("photoWindow");
    const previewImage=document.getElementById("previewImage");
    const frameImage=document.getElementById("frameImage");
    const options=document.getElementById("frameOptions");

    title.textContent=config.title;
    previewImage.src=state.imageData;

    const moods={
        original:"",
        warm:"sepia(.18) saturate(1.12) brightness(1.04)",
        cool:"saturate(.88) hue-rotate(12deg) brightness(1.03)",
        sunset:"sepia(.28) saturate(1.18) hue-rotate(-10deg) brightness(1.02)",
        night:"brightness(.78) saturate(.8) contrast(1.08)"
    };
    const styles={
        original:"",
        watercolor:"saturate(.85) brightness(1.08) contrast(.92)",
        oil:"saturate(1.22) contrast(1.08)",
        sand:"sepia(.22) saturate(.9) brightness(1.03)",
        sketch:"grayscale(.75) contrast(1.12)"
    };

    const frameOptions=(config.preview && config.preview.options) || [];
    let selectedId=state.frame || (frameOptions[0] && frameOptions[0].id);

    function getFrame(id){
        return frameOptions.find(option=>option.id===id) || frameOptions[0];
    }

    function renderPhoto(s){
        previewImage.style.filter=[moods[s.mood]||"",styles[s.style]||""].filter(Boolean).join(" ");
        const editorCanvasReference=390;
        const scaleFactor=photoWindow.clientWidth/editorCanvasReference;
        const x=(Number(s.offsetX)||0)*scaleFactor;
        const y=(Number(s.offsetY)||0)*scaleFactor;
        previewImage.style.transform=`translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${Number(s.rotation)||0}deg) scale(${Number(s.scale)||1})`;
    }

    function renderFrame(){
        const option=getFrame(selectedId);
        if(!option) return;

        frameStack.style.aspectRatio=String(option.aspectRatio || (option.id==="green" ? 773/1054 : 671/894));
        frameImage.src=option.image;
        frameImage.alt=option.name || "선택한 실제 액자";

        const h=option.hole;
        photoWindow.style.left=h.left+"%";
        photoWindow.style.top=h.top+"%";
        photoWindow.style.width=h.width+"%";
        photoWindow.style.height=h.height+"%";

        const s=window.MOODAY.EditorState.patch({frame:selectedId});
        renderPhoto(s);

        options.querySelectorAll(".frame-option").forEach(button=>{
            button.classList.toggle("active",button.dataset.id===selectedId);
            button.setAttribute("aria-selected",button.dataset.id===selectedId ? "true" : "false");
        });
    }

    frameOptions.forEach(option=>{
        const button=document.createElement("button");
        button.type="button";
        button.className="frame-option";
        button.dataset.id=option.id;
        button.setAttribute("aria-label",option.name || option.id);
        button.setAttribute("aria-selected","false");

        const image=document.createElement("img");
        image.className="frame-thumb";
        image.src=option.image;
        image.alt=option.name || option.id;
        button.appendChild(image);

        button.onclick=()=>{
            selectedId=option.id;
            renderFrame();
        };
        options.appendChild(button);
    });

    document.getElementById("backBtn").onclick=()=>history.back();
    document.getElementById("nextBtn").onclick=()=>{
        const nextState=window.MOODAY.EditorState.patch({frame:selectedId});
        const orderQuery=params.get("orderId") ? `&orderId=${encodeURIComponent(params.get("orderId"))}` : ((params.get("order") || params.get("ordered") || params.get("hasOrder")) ? `&order=${encodeURIComponent(params.get("order") || params.get("ordered") || params.get("hasOrder"))}` : "");
        location.href=`scenePreview.html?product=${encodeURIComponent(config.id)}&frame=${encodeURIComponent(nextState.frame)}${orderQuery}`;
    };

    renderFrame();
    window.addEventListener("resize",()=>renderFrame());
})();
