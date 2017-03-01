var express = require("express");
var app = express();
var path =require("path");
var mongoose = require("mongoose");

var {handleError} = require("./util_helpers.js");

//mongoose.connect("mongodb://localhost/dbname");

app.use(function(req, res, next){
	if(req.headers["x-forwarded-proto"] === "https"){		
		res.redirect("http://"+req.hostname+req.url);
	}else{		
		next();
	}
});

app.use(express.static(__dirname + '/frontend/public'));

//index route
app.get("/", function(request, response){			
	response.json({status: 'ok'})
});

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});

app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})