//the middleware emits actions to the backend
//if the action has set meta.remote == true
export default socket => store => next => action => {	
	if (action.meta && action.meta.remote) {
		
		var {room} = store.getState();		
		socket.emit('action', {action, room});
	}
  
	return next(action);
}