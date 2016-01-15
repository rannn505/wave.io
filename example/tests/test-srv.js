/**
 * Created by RAN on 18/12/2015.
 */

var serve = require('node-static');
var file2 = new serve.Server('./',{ indexFile: "test-index.html" });
var url = require('url');
require('http')
    .createServer(function(req, res) {
        req.addListener('end', function () {
            file2.serve(req, res);
        }).resume();
        if (url.parse(req.url).pathname == '/test'){
            res.end(JSON.stringify({test:'test'}));
        }
    }).listen(3000,function(){
    console.log("Listening 3000");
});
