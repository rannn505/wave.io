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
