(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.http = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by RAN on 02/01/2016.
 */

var MODULE_NAME = 'pulse.io';

var RequestMethod = require('./requestmethod');
var WS = require('./ws3');

module.exports = {
    seturl : CONN,
    get    : GET,
    post   : POST,
    put    : PUT,
    delete : DELETE

};

var socket = null;
var requestStack = [];

function CONN   (url) {

    if (!"WebSocket" in window)
        throw MODULE_NAME + '::WebSocket NOT supported by your Browser!';
    else
    {
        socket = new WS(url);

        socket.onmessage(function(response){
            requestStack.forEach(function (request, index) {
                if(request.uri == response.uri && request.method == response.method){
                    request.cb(response.data);
                    delete requestStack[index];
                }
            })
        });
    }
}
function GET    (uri,cb)     {_sender(new RequestMethod("GET",    uri, '',   (typeof cb != 'undefined'), (cb || function(){})));}
function POST   (uri,data,cb){_sender(new RequestMethod("POST",   uri, data, (typeof cb != 'undefined'), (cb || function(){})))}
function PUT    (uri,data,cb){_sender(new RequestMethod("PUT",    uri, data, (typeof cb != 'undefined'), (cb || function(){})))}
function DELETE (uri,data,cb){_sender(new RequestMethod("DELETE", uri, data, (typeof cb != 'undefined'), (cb || function(){})))}

function _sender (RequestMethod) {
    if(socket){
        socket.send(RequestMethod);
        if(RequestMethod.reswaiter) {
            requestStack.push(RequestMethod);
        }
    }
}

},{"./requestmethod":5,"./ws3":6}],2:[function(require,module,exports){
/**
 * The fastest communication via WebSocket using a familiar HTTP syntax.
 * @name wave.io
 * @version v1.0.0 - 02-01-2016
 * @link https://github.com/rannn505/wave.io
 * @author rannn505 <rannn505@outlook.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

module.exports = require('./http3');
},{"./http3":1}],3:[function(require,module,exports){
/**
 * Created by RAN on 25/12/2015.
 */

module.exports = {
    toJSON: toJSON,
    toSTR: toSTR
};

function toJSON (str){
    return JSON.parse(str);
}

function toSTR (json){
    return JSON.stringify(json);
}

},{}],4:[function(require,module,exports){
!function(a,b){"function"==typeof define&&define.amd?define([],b):"undefined"!=typeof module&&module.exports?module.exports=b():a.ReconnectingWebSocket=b()}(this,function(){function a(b,c,d){function l(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,!1,!1,b),c}var e={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3};d||(d={});for(var f in e)this[f]="undefined"!=typeof d[f]?d[f]:e[f];this.url=b,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var h,g=this,i=!1,j=!1,k=document.createElement("div");k.addEventListener("open",function(a){g.onopen(a)}),k.addEventListener("close",function(a){g.onclose(a)}),k.addEventListener("connecting",function(a){g.onconnecting(a)}),k.addEventListener("message",function(a){g.onmessage(a)}),k.addEventListener("error",function(a){g.onerror(a)}),this.addEventListener=k.addEventListener.bind(k),this.removeEventListener=k.removeEventListener.bind(k),this.dispatchEvent=k.dispatchEvent.bind(k),this.open=function(b){h=new WebSocket(g.url,c||[]),b||k.dispatchEvent(l("connecting")),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",g.url);var d=h,e=setTimeout(function(){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",g.url),j=!0,d.close(),j=!1},g.timeoutInterval);h.onopen=function(){clearTimeout(e),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onopen",g.url),g.protocol=h.protocol,g.readyState=WebSocket.OPEN,g.reconnectAttempts=0;var d=l("open");d.isReconnect=b,b=!1,k.dispatchEvent(d)},h.onclose=function(c){if(clearTimeout(e),h=null,i)g.readyState=WebSocket.CLOSED,k.dispatchEvent(l("close"));else{g.readyState=WebSocket.CONNECTING;var d=l("connecting");d.code=c.code,d.reason=c.reason,d.wasClean=c.wasClean,k.dispatchEvent(d),b||j||((g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onclose",g.url),k.dispatchEvent(l("close")));var e=g.reconnectInterval*Math.pow(g.reconnectDecay,g.reconnectAttempts);setTimeout(function(){g.reconnectAttempts++,g.open(!0)},e>g.maxReconnectInterval?g.maxReconnectInterval:e)}},h.onmessage=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",g.url,b.data);var c=l("message");c.data=b.data,k.dispatchEvent(c)},h.onerror=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onerror",g.url,b),k.dispatchEvent(l("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(b){if(h)return(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","send",g.url,b),h.send(b);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(a,b){"undefined"==typeof a&&(a=1e3),i=!0,h&&h.close(a,b)},this.refresh=function(){h&&h.close()}}return a.prototype.onopen=function(){},a.prototype.onclose=function(){},a.prototype.onconnecting=function(){},a.prototype.onmessage=function(){},a.prototype.onerror=function(){},a.debugAll=!1,a.CONNECTING=WebSocket.CONNECTING,a.OPEN=WebSocket.OPEN,a.CLOSING=WebSocket.CLOSING,a.CLOSED=WebSocket.CLOSED,a});

},{}],5:[function(require,module,exports){
/**
 * Created by RAN on 25/12/2015.
 */

module.exports = RequestMethod;

/**
 *
 * @param method
 * @param uri
 * @param data
 * @param cb
 */
function RequestMethod (method,uri,data,reswaiter,cb){
    return {
        "method": method,
        "uri": uri,
        "data": data,
        "reswaiter":reswaiter,
        "cb": cb
    };
}

},{}],6:[function(require,module,exports){
/**
 * Created by RAN on 01/01/2016.
 */

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

},{"./parser":3,"./reconnecting-websocket.min":4}]},{},[2])(2)
});