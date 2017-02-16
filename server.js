var express    = require('express')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs');
var fileupload = require("express-fileupload");
http = require('http');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
var reuse = require("./reusable.js");
var reusable = new reuse();
var cam = require("./camera.js");
var camera = new cam();

app.post('/api/v1/:id',function(req,res){
    res.end(req.params.id + " Done!!!");
    reusable.log(req.params.id);
    reusable.log(req.body);
}); 

app.get('/api/v1/:id',function(req,res){
    reusable.log("Received GET request for Device: "+req.params.id);
    camera.getCameraPicture(req.params.id,function(err,result){
        if(err){
            reusable.sendResponse(400,{'Content-Type': 'application/json'},'{"error":"Bad Request"}',"Error in GET camera Data",res,err,result);
        }else{
            reusable.sendResponse(200,{'Content-Type': 'application/json'},JSON.stringify(result),"Successfully Sent The Image",res,err,result);
        }
    });
}); 

app.get('/api/v1/Register/:id',function(req,res){
    reusable.log("Received GET request for Device: "+req.params.id);
    camera.isRegisteredCamera(req.params.id,function(isRegistered){
        if(isRegistered){
            reusable.sendResponse(200,{'Content-Type': 'application/json'},'{"Successfully":"Successfully Register Your Camera"}',"Successfully Register Your Camera",res,null,null);
        }else{
            camera.registerCamera(req.params.id,function(err,result){
                if(err){
                    reusable.sendResponse(400,{'Content-Type': 'application/json'},'{"error":"Bad Request"}',"Error in GET camera Data",res,err,result);
                }else{
                    reusable.sendResponse(200,{'Content-Type': 'application/json'},'{"Successfully":"Successfully Register Your Camera"}',"Successfully Register Your Camera",res,err,result);
                }
            });
        }
    });
    
}); 

port = 3001;
host = '127.0.0.1';
var server = app.listen(port, function(){
    console.log('Listening at http://' + host + ':' + port);    
});
