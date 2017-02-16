var express    = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs');
var fileupload = require("express-fileupload");
http = require('http');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.post('/api/v1/:id',function(req,res){
    res.end(req.params.id + " Done!!!");
    console.log(req.params.id);
    console.log(req.body);
}); 

port = 3001;
host = '127.0.0.1';
var server = app.listen(port, function(){
    console.log('Listening at http://' + host + ':' + port);    
});
