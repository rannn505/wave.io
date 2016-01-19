module.exports = ws;
var parser = require('./parser');
var ReconnectingWebSocket = require('./reconnecting-websocket.min');

function ws (url) {

    var failedStack = [];
    var socket = new ReconnectingWebSocket("ws://" + url, null, {reconnectInterval:2000,maxReconnectInterval:4000});

    function send (req) {
        if(socket.readyState == WebSocket.OPEN)
            socket.send(parser.toSTR(req));
        else
            failedStack.push(req);
    }

    function onmessage (cb) {
        socket.addEventListener('message', function (e) {
            cb(parser.toJSON(e.data));
        })
    }

    socket.addEventListener('open', function () {
        failedStack.forEach(function (req, index) {
            socket.send(parser.toSTR(req));
        });

        window.addEventListener('unload', function(){
            socket.close();
        });
    },false);

    socket.addEventListener('close', function(e){
        failedStack = [];
        //throw MODULE_NAME + '::socket disconnected ->code:'+e.code;
    },false);

    return {
        "onmessage": onmessage,
        "send":send
    };
}