import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';

import {resetGame} from 'actions/Actions';


class NotFound404 extends Component{
	handleClick(e){		
		browserHistory.push('/')
		this.props.resetGame();
	}

	render() {
		return (
			<div className="notfound404 text-center">
				<h1 className='page-title'>
					<span>Game</span><span>Not</span><span>Found</span>
				</h1>				
				<button className="btn btn-custom-danger" onClick={this.handleClick.bind(this)}>
					Start New Game
				</button>
			</div>
		);	
	}
}



export default connect(null, {resetGame})(NotFound404);