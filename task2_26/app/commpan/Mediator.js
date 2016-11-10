
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
module.exports = Mediator;