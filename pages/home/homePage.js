/**
 * ================================================================
 * MOODAY V4
 * File      : homePage.js
 * Path      : /pages/home/homePage.js
 * Module    : Home
 * Version   : V4.1
 * ================================================================
 */

document.addEventListener("DOMContentLoaded", initHomePage);
window.addEventListener("resize", updateHomeLayout);

function initHomePage() {

    updateHomeLayout();

    bindHomeButtons();

}

function bindHomeButtons() {

    const cards = document.querySelectorAll(".product-card");

    if (cards.length < 6) return;

    // 相纸相框：直接复用已经确认完成的魔镜灯光画两页
    cards[0].addEventListener("click", () => {
        window.location.href = "pages/editor/upload.html?product=photoFrame&demo=1";
    });

    // 艺术相框：直接复用已经确认完成的魔镜灯光画两页
    cards[1].addEventListener("click", () => {
        window.location.href = "pages/editor/upload.html?product=artFrame";
    });

    // 魔镜灯光画：原来的同一套标准页面
    cards[2].addEventListener("click", () => {
        window.location.href = "pages/editor/upload.html?product=magicMirror";
    });

}

function updateHomeLayout() {

    const page = document.querySelector(".page-container");
    const bannerSection = document.querySelector(".banner-section");
    const banner = document.querySelector(".banner-slider");
    const store = document.querySelector(".store-card");
    const grid = document.querySelector(".product-grid");

    if (!page || !bannerSection || !banner || !store || !grid) return;

    /* ---------- 固定间距 ---------- */

    const GAP = 8;

    /* ---------- Banner ---------- */

    const bannerWidth = banner.clientWidth;
    const bannerHeight = bannerWidth * 1.5;

    /* ---------- 剩余高度 ---------- */

    const contentHeight = page.clientHeight;

    const remainHeight =
        contentHeight -
        bannerHeight -
        GAP -
        GAP -
        GAP;

    const storeHeight = remainHeight * 0.28;
    const gridHeight = remainHeight - storeHeight;

    /* ---------- 应用 ---------- */

    bannerSection.style.height = `${bannerHeight}px`;
    banner.style.height = "100%";

    store.style.marginTop = `${GAP}px`;
    store.style.height = `${storeHeight}px`;

    grid.style.marginTop = `${GAP}px`;
    grid.style.height = `${gridHeight}px`;
    grid.style.marginBottom = `${GAP}px`;

}