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
			<div className="notfound404 jumbotron text-center">
				<h1>Game Not Found</h1>
				<p className="text-danger">Error 404</p>
				<button className="btn btn-custom-danger" onClick={this.handleClick.bind(this)}>
					<i className="glyphicon glyphicon-home"></i>Take Me Home
				</button>
			</div>
		);	
	}
}



export default connect(null, {resetGame})(NotFound404);