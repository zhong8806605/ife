
var Ship = require('./Ship');
var Mediator = require("./Mediator");
//控制中心（指挥官）
var Commander = {
    shipCount: 0,
    shipPara: {
        speed: 1,
        inputEnergy: 0.2,
        energyType: "劲量型(能源补充2%/s)",
        speedType: "前进号(速度30px/s)"
    },
    createNewShip: function () {
        this.shipCount++;
        var name = "第" + (this.shipCount) + "号飞船 ";
        var id = "ship" + (this.shipCount);
        var ship = new Ship(name, id, this.shipPara.inputEnergy, this.shipPara.speed);
        ship.createShip();
        console.log(this.shipPara);
        //飞船创建控制器各个组件
        var controlNode = document.querySelector(".control");
        var shipController = document.createElement("div");
        shipController.id = id;
        shipController.classList.add("clear")

        //创建飞船控制器行星号 飞行按钮 停止按钮 摧毁按钮
        var shipNameNode = document.createElement("div");
        shipNameNode.innerHTML = name + this.shipPara.energyType + " " + this.shipPara.speedType;

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
        var shipParaNode = document.querySelector(".shipPara");
        createShipNode.onclick = this.createNewShip.bind(this);
        shipParaNode.onclick = function (event) {
            if (event.target.name == "speed") {
                this.shipPara.speed = Number(event.target.dataset.speed);
                this.shipPara.speedType = event.target.nextSibling.innerHTML;
            }
            if (event.target.name == "energy") {
                this.shipPara.inputEnergy = Number(event.target.dataset.energy);
                this.shipPara.energyType = event.target.nextSibling.innerHTML;
            }
        }.bind(this)
    }
}
module.exports = Commander;