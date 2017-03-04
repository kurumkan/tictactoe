export default function(state='', action){	
	switch(action.type){		
		case 'SET_ROOM':			
			return action.payload;			
			
		default:
			return state;			
	}	

}