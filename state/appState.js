/** MOODAY V4 - Persistent app/order state */
(function(){
    const KEY="mooday.appState.v2";
    function read(){ try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{};}catch(e){return {};}}
    function write(s){ try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){} }
    const AppState={
        get(){return read();},
        setProduct(product){const s=read();s.product=product;s.page="";write(s);},
        setPage(page){const s=read();s.page=page;write(s);},
        getProduct(){return read().product||"photoFrame";},
        setOrder(orderId){const s=read();s.orderId=orderId||"";s.hasOrder=!!orderId;s.orderVerified=false;s.submitted=false;write(s);},
        setCustomer(customer){const s=read();s.customer=Object.assign({},customer||{});s.orderVerified=!!(s.orderId && customer && customer.orderId===s.orderId);s.hasOrder=s.orderVerified;write(s);},
        setHasOrder(v){const s=read();s.hasOrder=!!v;s.orderVerified=!!v;write(s);},
        clearOrder(){const s=read();delete s.orderId;s.hasOrder=false;s.orderVerified=false;s.submitted=false;write(s);},
        setSubmitted(v){const s=read();s.submitted=!!v;write(s);},
        isSubmitted(){return !!read().submitted},
        isOrderVerified(){const s=read();return !!(s.orderVerified && s.orderId);}
    };
    window.MOODAY=window.MOODAY||{};window.MOODAY.AppState=AppState;
})();
