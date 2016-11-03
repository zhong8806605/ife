//飞船类
var Ship = function (name, id) {
    this.name = name;
    this.id = id;
    this.energy = 100;
    this.pathway = 1;
    this.speed = 0.5;
    this.deg = 0.01;
    this.flFun = null;
}
Ship.prototype.createShip = function () {
    var universeNode = document.getElementById("universe");
    var shipNode = document.createElement("div");
    shipNode.classList.add("ship");
    shipNode.id = this.id;
    shipNode.innerHTML = "<div class = 'ship_cont'>" + this.name + "</div>"
    universeNode.appendChild(shipNode);
}
Ship.prototype.fly = function () {
    var that = this;
    this.flFun = setInterval(function () {
            var shipNode = document.getElementById(that.id);
            shipNode.style.transform = "rotate(" + (that.deg += that.speed) + "deg)";
    }, 1);
}
Ship.prototype.stop = function () {
    clearInterval(this.flFun);
}


var Commander = {
    shipCount: 0,
    createNewShip: function () {
        var name = "第" + (this.shipCount + 1) + "号飞船"
        var id = "ship" + (this.shipCount + 1);
        var ship = new Ship(name, id);
        ship.createShip();
        //飞船创建控制器各个组件
        var controlNode = document.querySelector(".control");
        var shipController = document.createElement("div");
        shipController.id = id;
        
        //创建飞船控制器行星号 飞行按钮 停止按钮 摧毁按钮
        var shipNameNode = document.createElement("div");
        shipNameNode.innerHTML = name;
        //
        var flyNode = document.createElement("div");
        flyNode.innerHTML = "飞行";
        flyNode.onclick = ship.fly.bind(ship);
        flyNode.classList.add("control_btn");

        var stopNode = document.createElement("div");
        stopNode.innerHTML = "停止";
        stopNode.onclick = ship.stop.bind(ship)
        stopNode.classList.add("control_btn");

        var destroyNode = document.createElement("div");
        destroyNode.innerHTML = "销毁";
        destroyNode.dataset.shipId = id;
        destroyNode.onclick =function(Event){ship.stop(); this.destroyShip(Event);}.bind(this);
        destroyNode.classList.add("control_btn");

        shipController.appendChild(shipNameNode);
        shipController.appendChild(flyNode);
        shipController.appendChild(stopNode);
        shipController.appendChild(destroyNode);
        controlNode.appendChild(shipController);
        
        this.shipCount++
    },
    destroyShip:function(Event){
        Event.target.parentElement.parentElement.removeChild(Event.target.parentElement);
        var shipNode = document.getElementById(Event.target.dataset.shipId);
        shipNode.parentElement.removeChild(shipNode);
    },
    //绑定创建飞船事件
    init:function(){
        var createShipNode =document.querySelector(".create");
        createShipNode.onclick = this.createNewShip.bind(this);
    }
}
Commander.init();

