var messageSound,
	moveSound,
	loseSound,
	winSound,
	drawSound;

soundManager.setup({
	onready: function() {    
		debugMode: false,
		messageSound = soundManager.createSound({
		  id: 'messageSound', 
		  url: 'http://www.noiseforfun.com/waves/interface-and-media/NFF-menu-03-a.wav'      
		});    
		moveSound = soundManager.createSound({
		  id: 'moveSound', 
		  url: 'http://www.noiseforfun.com/waves/interface-and-media/NFF-switchy-02.wav'      
		});    
		loseSound = soundManager.createSound({
		  id: 'loseSound', 
		  url: 'http://www.noiseforfun.com/waves/voice-and-speech/NFF-mad-laughter-2.wav'      
		});    
		winSound = soundManager.createSound({
		  id: 'winSound', 
		  url: 'http://www.noiseforfun.com/waves/voice-and-speech/NFF-yahoo.wav'      
		});    
		drawSound = soundManager.createSound({
		  id: 'drawSound', 
		  url: 'http://www.noiseforfun.com/waves/voice-and-speech/NFF-mad-laughter.wav'      
		});    
	}
});

export function sendMessage(data){			
	return {
		type: 'SEND_MESSAGE',	
		payload: data,
		meta: {remote: true}
	}
}

export function receiveMessage(data){		
	messageSound.play();				
	return {
		type: 'RECEIVE_MESSAGE',	
		payload: data
	}
}

export function setRoom(room){		
	return {				
		type: 'SET_ROOM',	
		payload: room,
		meta: {remote: true}		
	}
}

export function setGameStatus(status){	
	switch(status){
		case 'WIN':
			winSound.play();
			break;
		case 'LOSE':
			loseSound.play();
			break;	
		case 'DRAW':
			drawSound.play();
			break;		
	}		
	return {		
		type: 'SET_GAME_STATUS',	
		payload: status		
	}
}

export function makeMove(id){
	moveSound.play();
	return function(dispatch){
		dispatch(changeGameTurn());

		var coords = {
			x: id.charAt(1),
			y: id.charAt(2)
		}		
		dispatch({
			type: 'MAKE_MOVE',
			payload: coords,
			meta: {remote: true}
		});		
	}	
}

export function changeGameTurn(){	
	return {
		type: 'CHANGE_GAME_TURN'
	}
}

export function setSybmol(symbol){	
	return {
		type: 'SET_SYMBOL',
		payload: symbol
	}
}

export function updateBoard(board){	
	moveSound.play();
	return function(dispatch){
		dispatch({
			type: 'UPDATE_BOARD',
			payload: board
		});
		dispatch(changeGameTurn());
	}	
}

export function resetGame(){	
	return function(dispatch){				
		dispatch({
			type: 'RESET_GAME',
			meta: {remote: true}
		});
		dispatch({
			type: 'CLEAR_MESSAGES'
		});
	}	
}