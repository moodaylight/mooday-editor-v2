/**
 * ================================================================
 * MOODAY V4
 * File      : productConfig.js
 * Path      : /config/productConfig.js
 * Module    : Config
 * Version   : V4.1
 * ================================================================
 */

const PRODUCT_CONFIG = {
    photoFrame: {
        id: "photoFrame",
        title: "인화지 액자",
        upload: {
            format: "JPG · PNG",
            spec: "4×6"
        },
        editor: {
            tabs: ["mood", "style"]
        },
        preview: {
            type: "photoFrame",
            options: [
                {
                    id: "white",
                    name: "화이트",
                    image: "../../assets/images/frames/photoFrameWhite.png",
                    hole: { left: 12.37, top: 9.28, width: 75.71, height: 81.10 }
                },
                {
                    id: "green",
                    name: "그린",
                    image: "../../assets/images/frames/photoFrameGreen.png",
                    hole: { left: 13.07, top: 9.79, width: 73.74, height: 80.27 }
                },
                {
                    id: "brown",
                    name: "커피",
                    image: "../../assets/images/frames/photoFrameBrown.png",
                    hole: { left: 11.92, top: 9.28, width: 75.56, height: 81.10 }
                }
            ]
        }
    },

    artFrame: {
        id: "artFrame",
        title: "아트지 액자",
        upload: { format: "JPG · PNG", spec: "4×6" },
        editor: { tabs: ["mood", "style"] },
        preview: { type: "photoFrame", options: [] }
    },

    magicMirror: {
        id: "magicMirror",
        title: "매직미러 라이트",
        upload: { format: "JPG · PNG", spec: "4×6" },
        editor: { tabs: ["mood", "style"] },
        preview: { type: "magicMirror", options: [] }
    },

    idPhoto: {
        id: "idPhoto",
        title: "증명사진",
        upload: { format: "JPG · PNG", spec: "규격별 적용" },
        editor: { tabs: ["mood", "style"] },
        preview: { type: "idPhoto", options: [] }
    },

    freeProfile: {
        id: "freeProfile",
        title: "무료 프로필",
        upload: { format: "JPG · PNG", spec: "정사각형" },
        editor: { tabs: ["mood", "style"] },
        preview: { type: "freeProfile", options: [] }
    },

    freeWallpaper: {
        id: "freeWallpaper",
        title: "무료 배경",
        upload: { format: "JPG · PNG", spec: "모바일 세로" },
        editor: { tabs: ["mood", "style"] },
        preview: { type: "freeWallpaper", options: [] }
    }
};

window.MOODAY = window.MOODAY || {};
window.MOODAY.PRODUCT_CONFIG = PRODUCT_CONFIG;
