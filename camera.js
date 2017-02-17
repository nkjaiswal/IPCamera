module.exports = function(){
	var mongo = require("./mongodbhandler.js");
	var mongodbhandler = new mongo();

	var reuse = require("./reusable.js");
	var reusable = new reuse();
	var DateDiff = require('date-diff');

	this.getCameraPicture = function(cameraId,callback){
		//set [Request].[cameraId] = NOW() and return [Pictures].[cameraId]
		mongodbhandler.modify("Request",
			{"cameraId" : cameraId},
			{"cameraId" : cameraId, "LastRequest" : new Date()},
			function(err,result){
				mongodbhandler.read("Pictures",{"cameraId" : cameraId},function(error,picData){
					callback(error,picData);
				});
			});
	}

	this.shouldSendPicture = function(cameraId,callback){
		//if [Request].[cameraId].[LastRequest] - NOW() <= 3min then return true else false
		mongodbhandler.read("Request",
			{"cameraId" : cameraId},
			function(err,result){
				reusable.log(result[0].LastRequest);
				if(err){
					callback(false);
				}else{
					var diff = new DateDiff(new Date(), result[0].LastRequest);
					reusable.log(result[0].LastRequest + "|" + new Date() + "|" + diff.seconds());
					if(diff.seconds() <= 180){
						callback(true);
					}else{
						callback(false);
					}
				}
			});
	}

	this.updatePicture = function(cameraId,data,callback){
		//update [Pictures].[cameraId] = data
		mongodbhandler.modify("Pictures",
			{"cameraId" : cameraId},
			{"cameraId" : cameraId, "image" : data},
			callback);
	}

	this.registerCamera = function(cameraId,callback){
		mongodbhandler.insert("Request",
			{"cameraId" : cameraId, "LastRequest" : new Date()},
			function(err,result){
				mongodbhandler.insert("Pictures",
					{"cameraId" : cameraId, "image" : null},
					function(error,result2){
						callback(error,result2);
					});
			});
	}

	this.isRegisteredCamera = function(cameraId,callback){
		mongodbhandler.read("Pictures",
			{"cameraId" : cameraId},
			function(err,result){
				if(err){
					callback(false);
				}else{
					if(result.length>0){
						callback(true);
					}else{
						callback(false);
					}
				}
			});
	}
}