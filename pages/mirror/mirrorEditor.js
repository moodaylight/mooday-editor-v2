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

const tabs = [...document.querySelectorAll(".template-tab")];
const panels = [...document.querySelectorAll(".template-panel-row")];

tabs.forEach(tab => {
    tab.onclick = () => {
        tabs.forEach(t => t.classList.remove("active"));
        panels.forEach(panel => panel.classList.add("hidden"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.remove("hidden");
    };
});

panels.forEach(panel => {
    panel.querySelectorAll(".template-card").forEach(card => {
        card.onclick = () => {
            panel.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        };
    });
});

document.getElementById("backBtn").onclick = () => {
    history.back();
};

document.getElementById("nextBtn").onclick = () => {
    alert("다음 페이지");
};

})();
