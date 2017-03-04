import React, { Component } from 'react';
import { connect } from 'react-redux';
import {makeMove} from 'actions/Actions';

class Board extends Component{

	handleClick(e){				
		var {id} = e.target;
		if(id && this.props.game.canMove){	
			console.log('move', id)		
			this.props.makeMove(id);					
		}
	}	

	render() {		
		var {board, canMove} = this.props.game;
		var className = canMove?'clickable':'';		

		var renderRow = (row, i)=>{			
			var cells = row.map((c,j) => {								
					switch(c){
						case 'x':
							return <td className='cross' key={j}>{c}</td>
						case 'o':
							return <td className='nought' key={j}>{c}</td>
						default:	
							return <td id={`c${i}${j}`} key={j} className={className}>{c}</td>
					}	
				});

			return <tr key={i}>{cells}</tr>
		}

		var renderBoard = board.map((row, i) => {
			return <tbody>{renderRow(row, i)}</tbody>			
		})	
		console.log(board)

		return (
			<div className='board' onClick={this.handleClick.bind(this)}>
				<table>
					{renderBoard}
				</table>
			</div>
		);		
	}
}

function mapStateToProps(state) {
	var {game} = state;
	return {		
		game		
	};
}

export default connect(mapStateToProps, {makeMove})(Board);