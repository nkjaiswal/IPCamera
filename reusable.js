module.exports = function() { 
	this.sendResponse = function (httpCode, contentType, content, consoleLog, response, err, result){
		response.writeHead(httpCode, contentType);
        response.end(content);
        if(err){
        	_log(consoleLog,err);	
        }else{
        	_log(consoleLog,result);
        }
	}

	this.composeMail = function(jsonData){
		var criticality;
		if(jsonData.C == 1){
			criticality = "Low";
		}else if(jsonData.C == 2){
			criticality = "Medium";
		}else if (jsonData.C == 3){
			criticality = "High";
		}else{
			criticality = "Unknown";
		}

		var message = "<H2>Critical Situation in Work station</H2><hr>Current Critical Situation:" + criticality + " <br>Hazard Type: " + jsonData.Hazard;
		message += "<br>Mines:" + jsonData.mines;
		message += "<hr><h6>Mining Monitoring Station</h6>"
		return message; 
	}

	this.log = function(message){
		_log(message);
	}

	_log = function(message){
		console.log(message);
	}
}