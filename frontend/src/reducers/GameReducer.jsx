export default function(state='', action){	

	switch(action.type){		
		case 'SET_GAME_STATUS':		
			return action.payload;			
			
		default:
			return state;			
	}	

}