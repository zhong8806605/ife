/*飞船类
 *@param {string} 飞船名称
 *@param {string} 飞船id
 */
var Ship = function (name, id) {
    this.name = name;
    this.id = id;
    this.energy = 100;
    this.pathway = 1;
    this.speed = 1;
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

//控制中心（指挥官）
var Commander = {
    shipCount: 0,
    createNewShip: function () {
        this.shipCount++;
        var name = "第" + (this.shipCount) + "号飞船";
        var id = "ship" + (this.shipCount);
        var ship = new Ship(name, id);
        ship.createShip();
        //飞船创建控制器各个组件
        var controlNode = document.querySelector(".control");
        var shipController = document.createElement("div");
        shipController.id = id;

        //创建飞船控制器行星号 飞行按钮 停止按钮 摧毁按钮
        var shipNameNode = document.createElement("div");
        shipNameNode.innerHTML = name;

        //控制中心的飞船起飞按钮
        var flyNode = document.createElement("div");
        flyNode.innerHTML = "飞行";
        flyNode.classList.add("control_btn");
        flyNode.onclick = Mediator.fly.bind(ship);

        //控制中心的飞船停止按钮
        var stopNode = document.createElement("div");
        stopNode.innerHTML = "停止";
        stopNode.classList.add("control_btn");
        stopNode.onclick = Mediator.stop.bind(ship);

        //控制中心的飞船摧毁按钮
        var destroyNode = document.createElement("div");
        destroyNode.innerHTML = "销毁";
        destroyNode.dataset.shipId = id;
        destroyNode.classList.add("control_btn");
        destroyNode.onclick = Mediator.destroy.bind(ship);

        //对HTML进行添加节点
        shipController.appendChild(shipNameNode);
        shipController.appendChild(flyNode);
        shipController.appendChild(stopNode);
        shipController.appendChild(destroyNode);
        controlNode.appendChild(shipController);

    },
    //绑定创建飞船事件
    init: function () {
        var createShipNode = document.querySelector(".create");
        createShipNode.onclick = this.createNewShip.bind(this);
    }
}

// 命令类，处理指挥官各类命令
var Mediator = {
    fly: function () {
        this.fly();
    },
    stop: function () {
        this.stop();
    },
    destroy: function (Event) {
        this.stop();
        var shipNode = document.getElementById(Event.target.dataset.shipId);
        shipNode.parentElement.removeChild(shipNode);
        Event.target.parentElement.parentElement.removeChild(Event.target.parentElement);
    }

}
Commander.init();