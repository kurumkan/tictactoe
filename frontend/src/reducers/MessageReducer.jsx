export default function(state=[], action){	

	switch(action.type){				
		case 'SEND_MESSAGE':		
		case 'RECEIVE_MESSAGE':	
			var remote=false;
			if(action.meta&&action.meta.remote)
				remote=true;
						
			return [...state, {text:action.payload, remote}];			
		
			
		default:
			return state;			
	}	

}