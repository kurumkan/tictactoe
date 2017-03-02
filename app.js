var express = require("express");
var app = express();
var path =require("path");
var {handleError} = require("./util_helpers.js");

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

const PORT = process.env.PORT||5000;

var server = app.listen(PORT, function(){
	console.log("Server started on port " + PORT);
});



// attach Socket.io to our server
var io = require('socket.io').listen(server);

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
	console.log('connection!!!')
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
    	console.log('room '+room)
        socket.join(room);
    });
    
    socket.on('fromclient', function(data){
    	console.log('from clint callback', data.message)
        //send the message to everyone in the room except sender
        socket.broadcast.to(data.room).emit('message', data.message);
    });        
});

