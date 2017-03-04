export function sendMessage(data){			
	return {
		type: 'SEND_MESSAGE',	
		payload: data,
		meta: {remote: true}
	}
}

export function receiveMessage(data){					
	return {
		type: 'RECEIVE_MESSAGE',	
		payload: data
	}
}

export function setRoom(room){
	console.log('setRoom', room)		
	return {				
		type: 'SET_ROOM',	
		payload: room,
		meta: {remote: true}		
	}
}

export function setGameStatus(status){		
	console.log('setGameStatus')
	return {		
		type: 'SET_GAME_STATUS',	
		payload: status		
	}
}

export function makeMove(id){
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
	return function(dispatch){
		dispatch({
			type: 'UPDATE_BOARD',
			payload: board
		});
		dispatch(changeGameTurn());
	}	
}

export function resetGame(){
	console.log('reset game action creator')
	return function(dispatch){		
		dispatch({
			type: 'RESET_GAME',
			meta: {remote: true}
		});
	}	
}