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

app.get('*', function (request, response){		
	response.sendFile(path.resolve(__dirname, './frontend/public', 'index.html'))
});




var server = require('http').Server(app);
const PORT = process.env.PORT||5000;

server.listen(PORT, function(err) {
  if (err) {
    return;
  } 
  console.log('server listening on port: ' + PORT);
});

// create the switchboard 
var switchboard = require('rtc-switchboard')(server);


switchboard.on('data', function(data, peerId, spark) {
    console.log({ peer: peerId }, 'received: ' + data);
});
 
switchboard.on('room:create', function(room) {
    console.log('room ' + room + ' created, now have ' + switchboard.rooms.length + ' active rooms');
    setTimeout(()=>{
        console.log('about emit end');
        switchboard.emit('call:ended')
    }, 20000);
});
 
switchboard.on('room:destroy', function(room) {
    console.log('room ' + room + ' destroyed, ' + switchboard.rooms.length + ' active rooms remain');

    if (typeof gc == 'function') {
        console.log('gc');
        gc();
    }
});














// attach Socket.io to our server
var io = require('socket.io').listen(server);

var rooms={};
// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    var room = uuid();
    socket.emit('room', room);    
    rooms[room]={
        board: null,
        cross: null,
        nought: null,
        whoseTurn: null
    };

    socket.on('action', function(data){
    	var {action} = data;   
        var {payload} = action;
        var {room} = data;
        switch(action.type){
            case 'SEND_MESSAGE':                
                //send the message to everyone in the room except sender                
                socket.broadcast.to(room).emit('message', payload);
                break;

            case 'SET_ROOM':
                var room = payload;                 
                var game = rooms[room];
                if(!game){       
                    console.log('will be refused', room)             
                    socket.emit('refuse');                    
                }else{
                    //num of clients in room                        
                    var n=0;
                    var roomData = io.sockets.adapter.rooms[room];
                    if(roomData) n = roomData.length;                                
                    
                    if(n<2){                    
                        //1st player joined the room
                        socket.join(room);                        
                        if(n==0){
                            game.cross = socket.id;  
                            game.whoseTurn = socket.id;                          
                        }else{
                            

                            //remove the room where the 2nd client had joined to
                            var roomToRemove=null;
                            var keys = Object.keys(rooms);
                            keys.map(key=>{
                                if(rooms[key].cross==socket.id||rooms[key].nought==socket.id)
                                    roomToRemove = key;
                            })
                            if(roomToRemove){
                                delete rooms[roomToRemove];                                
                            }
                            //2nd has player joined. 
                            socket.join(room);
                            //reset room
                            //socket.emit('room', room);    


                            //Start the game
                            io.in(room).emit('game status', 'START');
                            game.nought = socket.id; 
                            game.board=[['','',''],['','',''],['','','']];
                            //notify the client
                            io.sockets.connected[game.whoseTurn].emit('your turn');
                            io.sockets.connected[game.cross].emit('set symbol', 'CROSS');
                            io.sockets.connected[game.nought].emit('set symbol', 'NOUGHT');
                        }    
                    }else{
                        //the room is full(max 2 clients)
                        socket.emit('refuse');
                    }    
                }                                    
                break;
            case 'MAKE_MOVE':     
                var game = rooms[room]; 
                console.log('MAKE_MOVE',rooms, room)               
                if(game.whoseTurn==socket.id && game.board){
                    var coords = action.payload;                          
                    game.board[coords.x][coords.y]=game.whoseTurn==game.cross?'x':'o';                    

                    var clientToUpdate = game.whoseTurn==game.cross?game.nought: game.cross;
                    
                    io.sockets.connected[clientToUpdate].emit('update board', game.board);
                    game.whoseTurn = clientToUpdate;

                    var result = checkBoard(game.board);
                    if(result){
                        switch(result){                        
                            case 'CROSS':                                
                                if(socket.id == game.cross){
                                    socket.emit('game status', "WIN");                            
                                    socket.broadcast.to(game.nought).emit('game status', 'LOOSE');
                                }else{
                                    socket.emit('game status', "LOOSE");                            
                                    socket.broadcast.to(game.cross).emit('game status', 'WIN');
                                }                            
                                break;
            
                            case 'NOUGHT':                                 
                                if(socket.id == game.nought){
                                    socket.emit('game status', "WIN");                            
                                    socket.broadcast.to(game.cross).emit('game status', 'LOOSE');
                                }else{
                                    socket.emit('game status', "LOOSE");                            
                                    socket.broadcast.to(game.nought).emit('game status', 'WIN');
                                }                            
                                break;

                            case 'DRAW':                                 
                                io.in(room).emit('game status', 'DRAW');      
                                break;
                        }  
                        //end of the game
                        //remove the room
                        delete rooms[room];                        
                    }                      
                }
                break;
            case 'RESET_GAME':
                delete rooms[room];
                var newRoom = uuid();
                socket.emit('room', newRoom);    
                rooms[newRoom]={
                    board: null,
                    cross: null,
                    nought: null,
                    whoseTurn: null
                };      
                console.log('RESET GAME', newRoom, rooms);          
                break;                    
        }
    }); 

    socket.on('disconnect', () => {
        //notify the other user - he won
        //remove room                
        var roomsToRemove=[];
        var keys = Object.keys(rooms);
        keys.map(key=>{
            if(rooms[key].cross==socket.id){
                roomsToRemove.push(key);                
                if(rooms[key].nought)
                    socket.broadcast.to(rooms[key].nought).emit('game status', 'WIN');
            }else if(rooms[key].nought==socket.id){
                roomsToRemove.push(key);
                if(rooms[key].cross)
                    socket.broadcast.to(rooms[key].cross).emit('game status', 'WIN');
            }
        })
        if(roomsToRemove.length){
            roomsToRemove.map((roomToRemove)=>delete rooms[roomToRemove])            
        }        
    });

});

//returns `CROSS`,`NOUGHT`,`DRAW`, `null`
function checkBoard(board){
    var result = '';
    //check rows
    for(var i=0; i<board.length; i++){
        if(board[i][0]==board[i][1]&&board[i][0]==board[i][2]&&board[i][0])
            result = board[i][0]
    }
    //check cols
    for(var j=0; j<board.length; j++){
        if(board[0][j]==board[1][j]&&board[0][j]==board[2][j]&&board[0][j])
            result = board[0][j]
    }
    //check diagonals
    if(board[0][0]&&board[0][0]==board[1][1]&&board[0][0]==board[2][2])
        result = board[0][0];

    if(board[0][2]&&board[0][2]==board[1][1]&&board[0][2]==board[2][0])
        result = board[0][2];

    if(result)
        if(result=='x')
            return 'CROSS';
        else
            return 'NOUGHT';

    //report draw
    var emptyCells=0;
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board[0].length; j++){
            if(!board[i][j])
                emptyCells++;
        }
    }
    if(!emptyCells)
        return 'DRAW';
    else
        return null;
}

