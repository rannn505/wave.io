/**
 * Created by RAN on 31/12/2015.
 */

var serve = require('node-static');
var file = new serve.Server('./');
var http = require('http')
    .createServer(function(req, res) {
        req.addListener('end', function () {
            file.serve(req, res);
        }).resume();
    }).listen(8080,function(){
        console.log("Listening 8080");
    });

var router = require('wave.io-server')(http);

router.get('/getest',function(req,res){
    console.log(req);
    res.send({getest:'getest'});
});

router.post('/postest',function(req,res){
    console.log(req.data);
    res.send('<a href="https://github.com/rannn505/wave.io">Wave.io</a>');

});