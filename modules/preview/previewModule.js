/**
 * ================================================================
 * MOODAY V4
 * File      : previewModule.js
 * Path      : /modules/preview/previewModule.js
 * Module    : Preview
 * Version   : V4.1
 * ================================================================
 */

(function(){
    const PreviewModule = {
        setFrame(id){ return window.MOODAY.EditorState.patch({frame:id}); },
        getState(){ return window.MOODAY.EditorState.get(); }
    };

    window.MOODAY = window.MOODAY || {};
    window.MOODAY.PreviewModule = PreviewModule;
})();
