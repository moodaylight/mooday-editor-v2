/**
 * ================================================================
 * MOODAY V4
 * File      : editorModule.js
 * Path      : /modules/editor/editorModule.js
 * Module    : Editor
 * Version   : V4.1
 * ================================================================
 */

(function(){
    const EditorModule = {
        setMood(id){ return window.MOODAY.EditorState.patch({mood:id}); },
        setStyle(id){ return window.MOODAY.EditorState.patch({style:id}); },
        setTransform(values){ return window.MOODAY.EditorState.patch(values); },
        getState(){ return window.MOODAY.EditorState.get(); }
    };

    window.MOODAY = window.MOODAY || {};
    window.MOODAY.EditorModule = EditorModule;
})();
