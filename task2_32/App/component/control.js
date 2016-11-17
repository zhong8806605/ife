var config = require("./config.js");
var form   = require("./form.js");
//绑定相关事件。
var control = function control() {
    var formName = document.querySelector(".configName input");
    var configType = document.querySelector(".configType");
    var configSubmit = document.querySelector("#configSubmit");
    formName.onchange = formNameChangeEvent;
    configType.onclick = configTypeClickEvent;
    configSubmit.onclick = configSubmitEvent();
}
function formNameChangeEvent(event){
    config.name = event.target.value;
}
function configTypeClickEvent(event){
    if(event.target.nodeName === "INPUT")
        config.dataType = event.target.value;
}
function configSubmitEvent(){
    var formShowAreNode = document.querySelector(".showAre");    
     return function(){
         new form(formShowAreNode);
     }
}
module.exports = control;