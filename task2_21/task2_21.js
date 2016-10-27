/*去除重复
 *@param{Arrary}
 */
function distinct(data) {
    var obj = {},
        temData = [];
    for (var i = 0; i < data.length; i++) {
        if (obj[data[i]] === undefined) {
            temData.push(data[i]);
        }
        obj[data[i]] = "";
    }
    return temData;
}

/*
 *去除多余空格
 *param{Arrary}
 */
function delBlank(data) {
    var temData = data;
    temData.forEach(function(item) {
        if (typeof item === "string") {
            item = item.trim();
        } else {
            alert("输入的字符串有不是string类型的");
        }
    })
}

/*添加输入到输入框
 *@param{HTMLElement} 要添加的元素 
 *@param{Arrary}     要添加的内容
 */
function addInterst(ele, data) {
    var nedDiv;
    var temData = data.map(function(item) {
        newDiv = document.createElement("div");
        newDiv.innerHTML = item;
        newDiv.classList.add("div_show");
        ele.appendChild(newDiv);
    })
}


// target_input 输入空格，逗号，回车时把当前输入的内容作为一个tag放在输入框下面。
var targetNodekeyPressEvent = function() {
    var inputNode = document.getElementById("target_input");
    var inputShowNode = document.getElementById("input_show");
    return function(event) {
        if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
            var data = [];
            data.push(inputNode.value);
            addInterst(inputShowNode, data);
            inputNode.value = " ";
        }
    }
}()

//确认爱好按钮的事件函数
function ensurInterNodeEvent() {
    var intrstTextareNode = document.getElementById("text_input");
    var intrstShowNode = document.getElementById("text_areShow");
    var data = intrstTextareNode.value.split(/[\s,\n]+/g);
    addInterst(intrstShowNode, data);
}

//绑定事件函数
(function addEvent() {
    //绑定target 的输入空格，逗号，回车时的事件
    var inputNode = document.getElementById("target_input");
    inputNode.onkeyup = targetNodekeyPressEvent;
    var ensurInterNode = document.getElementById("insure_btn");
    ensurInterNode.onclick = ensurInterNodeEvent;
})();