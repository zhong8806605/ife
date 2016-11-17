var config = require("./config.js");
require("../../style/form.css");

function From(parentNode) {
    if (!config.name || !config.dataType) {
        alert("请填写表单相关信息")
        return;
    }
    var divNode = document.createElement("div");
    var inputNode = document.createElement("input");
    var noticNode = document.createElement("div");
    divNode.classList.add("form");
    divNode.innerHTML = "<label>" + config.name + "</label>"
    inputNode.onblur = onblurEvent.bind(this);
    noticNode.classList.add("notice");
    divNode.appendChild(inputNode);
    divNode.appendChild(noticNode);
    parentNode.appendChild(divNode);
    this.node = divNode;
    this.dataType = config.dataType;
}

function onblurEvent(Event) {
        var noticeNode = this.node.querySelector(".notice")
        var formText = Event.target.value;
        noticeNode.classList.add("notice");
        switch (this.dataType) {
        case "name":
            if (formText.search(/^[A-Za-z]+$/g) === -1)
                noticeNode.innerHTML = "请输入由字母组成的名字";
            else
                noticeNode.innerHTML = "";            
            break;
        case "email":
            if (formText.search(/"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"/g) === -1)
                noticeNode.innerHTML = "请输入正确的Email";
            else
                noticeNode.innerHTML = "";
            break;
        case "phoneNumber":
            if(formText.search(/^1\d{10}$/g) === -1)
                noticeNode.innerHTML = "请输入正确的电话号码";
            else
                noticeNode.innerHTML = "";                
            break;
        }
        this.node.appendChild(noticeNode);
}
module.exports = From;