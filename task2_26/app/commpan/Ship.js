var log = require("./log");
/*飞船类
 *@param {string} 飞船名称
 *@param {string} 飞船id
 */
var Ship = function () {
        var MAX_ENERGY = 80;
        var _Ship = function (name, id, inputEnergy, speed) {
            this.name = name;
            this.id = id;
            this.energy = 90;
            this.inputEnergy = inputEnergy;
            this.speed = speed;
            this.deg = 0;
            this.shipNode = null;
            this.stopInterFun = null;
            this.flyInterFun = null;
        }
        _Ship.prototype.createShip = function () {
            var universeNode = document.getElementById("universe");
            var shipNode = document.createElement("div");
            this.shipNode = shipNode;
            //创建飞船
            shipNode.classList.add("ship");
            shipNode.id = this.id;
            shipNode.innerHTML = "<div class = 'ship_cont'>" + this.name + "</div>"

            //创建飞船能源
            var shiEnergyNode = document.createElement("div");
            shiEnergyNode.classList.add("ship_energy");
            shipNode.appendChild(shiEnergyNode);
            universeNode.appendChild(shipNode);
            log("创建"+this.name);
        }
        _Ship.prototype.fly = function () {
            var that = this;
            if (!this.flyInterFun) {
                clearInterval(this.stopInterFun);
                this.stopInterFun = null;
                this.flyInterFun = setInterval(function () {
                    if (that.energy > 0) {
                        that.energy -= 0.2;
                        that.render(that.shipNode);
                    } else {
                        that.stop();
                    }
                }, 1);
            }
            log(that.name + "开始飞行");
        }
        _Ship.prototype.stop = function () {
            var that = this;
            if (!this.stopInterFun) {
                clearInterval(this.flyInterFun);
                this.flyInterFun = null;
                this.stopInterFun = setInterval(function () {
                    if (that.energy < MAX_ENERGY) {
                        that.energy += that.inputEnergy;
                    }
                    that.render(that.shipNode);
                }, 1)
            }
            log(that.name + "停止");
        }
        _Ship.prototype.render = function (shipNode) {
            var shiEnergyNode = shipNode.querySelector(".ship_energy");
            if (this.energy <= MAX_ENERGY) {
                shiEnergyNode.style.width = this.energy + "px";
            }
            if (this.flyInterFun) {
                shipNode.style.transform = "rotate(" + (this.deg += this.speed) + "deg)";
            }
        }
        return _Ship
    }()
module.exports = Ship;