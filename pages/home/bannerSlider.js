/**
 * ================================================================
 * MOODAY V4
 * File      : bannerSlider.js
 * Path      : /pages/home/bannerSlider.js
 * Module    : Home
 * Version   : V4.0
 * ---------------------------------------------------------------
 * 职责（负责）
 * 1. 首页 Banner 自动轮播
 * 2. 四张 PNG 图片循环播放
 * 3. 当前 Banner 状态管理
 * 4. 自动定时切换
 *
 * 不负责
 * - Banner 图片资源
 * - 页面跳转
 * - 活动链接
 * - 左右手势（后续开发）
 *
 * 调用关系
 * index.html
 *    ↓
 * bannerSlider.js
 *
 * 开发原则
 * - 唯一职责
 * - 只管理 Banner
 * - 不操作其它页面模块
 * ================================================================
 */

/* =========================
   全局状态
========================= */

const BANNER = {

    current : 0,

    interval : 3000,

    timer : null

};

/* =========================
   初始化
========================= */

document.addEventListener("DOMContentLoaded", initBannerSlider);

function initBannerSlider(){

    const items = document.querySelectorAll(".banner-item");

    if(items.length === 0) return;

    showBanner(0);

    startAutoPlay();

}

/* =========================
   自动播放
========================= */

function startAutoPlay(){

    stopAutoPlay();

    BANNER.timer = setInterval(()=>{

        nextBanner();

    },BANNER.interval);

}

function stopAutoPlay(){

    if(BANNER.timer){

        clearInterval(BANNER.timer);

        BANNER.timer = null;

    }

}

/* =========================
   下一张
========================= */

function nextBanner(){

    const items = document.querySelectorAll(".banner-item");

    if(items.length === 0) return;

    let next = BANNER.current + 1;

    if(next >= items.length){

        next = 0;

    }

    showBanner(next);

}

/* =========================
   指定显示
========================= */

function showBanner(index){

    const items = document.querySelectorAll(".banner-item");

    items.forEach(item=>{

        item.classList.remove("active");

    });

    items[index].classList.add("active");

    BANNER.current = index;

}

/* =========================
   对外接口（预留）
========================= */

function prevBanner(){

    const items = document.querySelectorAll(".banner-item");

    let prev = BANNER.current - 1;

    if(prev < 0){

        prev = items.length - 1;

    }

    showBanner(prev);

}