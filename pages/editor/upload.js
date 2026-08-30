/**
 * ================================================================
 * MOODAY V4
 * File      : upload.js
 * Path      : /pages/editor/upload.js
 * Module    : Upload UI
 * Version   : V4.1
 * ================================================================
 */
(function(){
    const params = new URLSearchParams(location.search);
    const productId = params.get("product") || "photoFrame";
    const config = window.MOODAY.PRODUCT_CONFIG[productId] || window.MOODAY.PRODUCT_CONFIG.photoFrame;
    const state = window.MOODAY.EditorState.get();

    window.MOODAY.AppState.setProduct(config.id);
    window.MOODAY.EditorState.patch({product:config.id});
    window.MOODAY.AppState.setPage("upload");

    const title = document.getElementById("productTitle");
    const formatText = document.getElementById("formatText");
    const specText = document.getElementById("specText");
    const uploadCenter = document.getElementById("uploadCenter");
    const image = document.getElementById("uploadedImage");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const nextBtn = document.getElementById("nextBtn");
    const rotateBtn = document.getElementById("rotateBtn");
    const previewArea = document.getElementById("previewArea");

    title.textContent = config.title;
    formatText.textContent = config.upload.format;
    specText.textContent = config.upload.spec;

    let rotation = state.rotation || 0;
    let scale = state.scale || 1;
    let offsetX = state.offsetX || 0;
    let offsetY = state.offsetY || 0;

    function render(){
        const hasImage = !!window.MOODAY.EditorState.get().imageData;
        uploadCenter.classList.toggle("hidden", hasImage);
        image.classList.toggle("hidden", !hasImage);
        uploadBtn.textContent = hasImage ? "사진 변경" : "사진 업로드";
        nextBtn.disabled = !hasImage;
        if(hasImage){
            image.src = window.MOODAY.EditorState.get().imageData;
            image.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${scale})`;
        }
    }

    function save(){
        window.MOODAY.EditorState.patch({rotation,scale,offsetX,offsetY});
        render();
    }

    document.getElementById("backBtn").onclick = () => history.back();
    uploadBtn.onclick = () => fileInput.click();
    fileInput.onchange = e => {
        const file = e.target.files && e.target.files[0];
        if(!file) return;
        window.MOODAY.UploadModule.saveImage(file, () => {
            rotation=0; scale=1; offsetX=0; offsetY=0; render();
        });
        fileInput.value = "";
    };
    rotateBtn.onclick = () => { rotation=(rotation+90)%360; save(); };
    nextBtn.onclick = () => {
        if(!window.MOODAY.UploadModule.hasImage()) return;
        const orderQuery=params.get("orderId") ? `&orderId=${encodeURIComponent(params.get("orderId"))}` : "";
        location.href = `editor.html?product=${encodeURIComponent(config.id)}${orderQuery}`;
    };

    let dragging=false, startX=0, startY=0, baseX=0, baseY=0, pinchDistance=0, pinchScale=1;
    function distance(a,b){ return Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY); }
    previewArea.addEventListener("touchstart", e => {
        if(e.touches.length===1){
            dragging=true; startX=e.touches[0].clientX; startY=e.touches[0].clientY; baseX=offsetX; baseY=offsetY;
        } else if(e.touches.length===2){
            dragging=false; pinchDistance=distance(e.touches[0],e.touches[1]); pinchScale=scale;
        }
    }, {passive:true});
    previewArea.addEventListener("touchmove", e => {
        if(e.touches.length===1 && dragging){
            offsetX=baseX+(e.touches[0].clientX-startX);
            offsetY=baseY+(e.touches[0].clientY-startY);
            save();
        } else if(e.touches.length===2){
            const d=distance(e.touches[0],e.touches[1]);
            if(pinchDistance>0){ scale=Math.min(3,Math.max(.6,pinchScale*d/pinchDistance)); save(); }
        }
        e.preventDefault();
    }, {passive:false});
    previewArea.addEventListener("touchend", e => { if(e.touches.length===0) dragging=false; });

    if (params.get("demo") === "1" && !state.imageData) {
        window.MOODAY.UploadModule.useDefault(() => {
            rotation=0; scale=1; offsetX=0; offsetY=0; render();
        });
    } else {
        render();
    }
})();
