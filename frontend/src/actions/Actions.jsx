
export function sendMessage(data){		
	console.log('sendMessage ',data)		
	return {
		type: 'SEND_MESSAGE',	
		payload: data,
		meta: {remote: true}
	}
}

export function receiveMessage(data){				
	console.log('receiveMessage ',data)		
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
	return {		
		type: 'SET_GAME_STATUS',	
		payload: status		
	}
}