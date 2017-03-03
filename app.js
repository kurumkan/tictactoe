var express = require("express");
var app = express();
var path = require("path");
var uuid = require('uuid');

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

var rooms=[];
// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    var room = uuid();
    socket.emit('room', room);    
    rooms.push(room);
    console.log('connnected', room)

    socket.on('action', function(data){
    	console.log('action', data)       
        var {payload} = data.action;
        switch(data.action.type){
            case 'SEND_MESSAGE':
                console.log('SEND_MESSAGE', data.room, payload)
                //send the message to everyone in the room except sender                
                socket.broadcast.to(data.room).emit('message', payload);
                break;

            case 'SET_ROOM':
                var room = payload; 
                console.log('SET_ROOM', payload) 
                if(rooms.indexOf(room)<0){                    
                    socket.emit('refuse');                    
                }else{
                    socket.emit('ok');                
                    //num of clients in room                        
                    var n=0;
                    var roomData = io.sockets.adapter.rooms[room];
                    if(roomData) n = roomData.length;                                
                    
                    if(n<2){                    
                        socket.join(room);
                        //2 clients in room. start game
                        if(n==1){
                            io.in(room).emit('start');                                        
                            console.log('start ',room)
                        }    
                    }else{
                        //the room is full(max 2 clients)
                        socket.emit('refuse');
                    }    
                }              
                
                break;
        }
    });          
});

