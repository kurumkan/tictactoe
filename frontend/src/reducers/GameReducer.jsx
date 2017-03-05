const INITIAL_STATE={
	board: [
		['','',''],
		['','',''],
		['','','']
	],
	//possible values `AWAIT`,`START`, `DRAW`, `WIN`, `LOOSE`
	status: 'AWAIT',  
	symbol: null,
	canMove: false
}

export default function(state=INITIAL_STATE, action){		
	switch(action.type){		
		case 'SET_GAME_STATUS':		
			return {...state, status: action.payload}; 	
		case 'CHANGE_GAME_TURN':
			return {...state, canMove: !state.canMove}						
		case 'SET_SYMBOL':
			return {...state, symbol: action.payload}	
		case 'MAKE_MOVE':			
			var {board} = state;
			var coords = action.payload;			
			board[coords.x][coords.y]=state.symbol=='CROSS'?'x':'o';			
			return {...state, board}							
		case 'UPDATE_BOARD':			
			return {...state, board: action.payload}		
		case 'RESET_GAME':			
			return {
				board: [
					['','',''],
					['','',''],
					['','','']
				],				
				status: 'AWAIT',  
				symbol: null,
				canMove: false
			};			
		default:
			return state;			
	}	

}