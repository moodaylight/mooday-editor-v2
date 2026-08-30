/**
 * ================================================================
 * MOODAY V4
 * File      : uploadModule.js
 * Path      : /modules/upload/uploadModule.js
 * Module    : Upload
 * Version   : V4.1
 * ================================================================
 */

(function(){
    const UploadModule = {
        saveImage(file, callback){
            const reader = new FileReader();
            reader.onload = function(){
                window.MOODAY.EditorState.patch({
                    imageData: reader.result,
                    rotation: 0,
                    scale: 1,
                    offsetX: 0,
                    offsetY: 0,
                    mood: "original",
                    style: "original"
                });
                if (callback) callback(reader.result);
            };
            reader.readAsDataURL(file);
        },

        useDefault(callback){
            fetch("../../assets/images/defaultUserPhoto.png")
                .then(r => r.blob())
                .then(blob => this.saveImage(new File([blob], "defaultUserPhoto.png", {type: blob.type}), callback))
                .catch(() => callback && callback(""));
        },

        hasImage(){ return !!window.MOODAY.EditorState.get().imageData; }
    };

    window.MOODAY = window.MOODAY || {};
    window.MOODAY.UploadModule = UploadModule;
})();
