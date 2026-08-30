/**
 * MOODAY V4 - Persistent draft state
 */
(function(){
    const KEY = "mooday.editorState.v2";
    const DEFAULT = {
        imageData: "", rotation: 0, scale: 1, offsetX: 0, offsetY: 0,
        mood: "original", style: "original", frame: "white",
        product: "photoFrame", updatedAt: 0
    };
    function read(){
        try { return Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY) || "{}")); }
        catch(e){ return Object.assign({}, DEFAULT); }
    }
    function write(state){
        try { localStorage.setItem(KEY, JSON.stringify(Object.assign({}, state, {updatedAt:Date.now()}))); } catch(e) {}
    }
    const EditorState = {
        get(){ return read(); },
        hasDraft(){ return !!read().imageData; },
        reset(){ write(Object.assign({}, DEFAULT)); },
        patch(values){ const next=Object.assign({},read(),values||{}); write(next); return next; }
    };
    window.MOODAY=window.MOODAY||{}; window.MOODAY.EditorState=EditorState;
})();
