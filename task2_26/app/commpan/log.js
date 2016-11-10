var log = function () {
    var showAreNode = document.querySelector(".showAre");
    _log = function(message){
        var messageNode = document.createElement("div");
        messageNode.innerHTML = message;
        showAreNode.appendChild(messageNode);
        showAreNode.scrollTop=showAreNode.scrollHeight;
    }
    return _log;
}()
module.exports = log;