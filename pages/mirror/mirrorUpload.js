(function(){
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product") || "magicMirror";

    const titles = {
        magicMirror: "매직미러 라이트",
        photoFrame: "인화지 액자",
        artFrame: "아트지 액자"
    };

    const title = document.getElementById("productTitle");
    if (title) title.textContent = titles[product] || titles.magicMirror;

    const homeBtn = document.getElementById("homeBtn");
    const nextBtn = document.getElementById("nextBtn");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const previewArea = document.getElementById("previewArea");
    const rotateBtn = document.getElementById("rotateBtn");

    let rotation = 0;

    if (homeBtn) {
        homeBtn.onclick = () => history.back();
    }

    if (uploadBtn && fileInput) {
        uploadBtn.onclick = () => fileInput.click();

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            previewArea.innerHTML = `<img src="${url}" alt="업로드한 사진">`;
            rotation = 0;
        };
    }

    if (rotateBtn) {
        rotateBtn.onclick = () => {
            rotation = (rotation + 90) % 360;
            const image = previewArea.querySelector("img");
            if (image) image.style.transform = `rotate(${rotation}deg)`;
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            window.location.href =
                `mirrorEditor.html?product=${encodeURIComponent(product)}`;
        };
    }
})();