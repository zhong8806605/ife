var Layout = (function () {

    //初始化 渲染函数和初始化函数 
    var render = (function () {
        var div = document.createElement("div");
        div.id = "layout";
        div.innerHTML = "<div class='content'><h3>浮出层标题</h3><p>这里是浮出层内容</p><div class='sector'><div><button id = 'layOutInsure'>确认</button><button id = 'layOutCancel'>取消</button></div></div></div>";
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    })();
    var insureBtn = document.getElementById("layOutInsure");
    var cancelBtn = document.getElementById("layOutCancel");
    //显示
    var _display = function () {
        render.style.display = "block";
    };
    //隐藏
    var _hide = function () {
        render.style.display = "none";
    };
    //确认按钮绑定事件
    var _insurBtnEvent = function _insurBtnEvent(event, callBack) {
        if (typeof event === 'string' && typeof callBack === "function")
                insureBtn.addEventListener(event, callBack);
    };
    var _cancelBtnEvent = function (event, callBack) {
        if (typeof event === 'string' && typeof callBack === "function")
            cancelBtn.addEventListener(event, callBack);
    };
    //初始化 绑定相关事件
    var init = (function () {
            render.onclick = function (Event) {
                if (Event.target.className !== "content" && Event.target.id === "layout")
                    _hide();
            };
            _insurBtnEvent('click', function () {
                    _hide();
            });
            _cancelBtnEvent('click', function () {
                _hide();
            });
        })()
        //将接口暴露出来
    var _layout = {
        display: _display,
        hide: _hide,
        insurBtnEvent: _insurBtnEvent,
        cancelBtnEvent: _cancelBtnEvent
    };
    return _layout;
})();
document.getElementById("layerBtn").onclick = function () {
    Layout.display();
}