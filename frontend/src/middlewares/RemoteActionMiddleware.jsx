export default socket => store => next => action => {	
	if (action.meta && action.meta.remote) {
		
		var {room} = store.getState();		
		socket.emit('action', {action, room});
	}
  
	return next(action);
}