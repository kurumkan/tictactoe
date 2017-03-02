export default function(state='', action){
	
	switch(action.type){

		case 'SET_ERROR':	
			return action.payload;

		case 'REMOVE_ERROR':	
			return '';	

		default:
			return state;	
	}
}