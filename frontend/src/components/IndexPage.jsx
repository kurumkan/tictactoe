import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';


import {setRoom, resetGame} from 'actions/Actions';
import Board from 'components/Board';
import VideoBox from 'components/VideoBox';
import TextBox from 'components/TextBox';

class IndexPage extends Component{
	componentWillMount() {	
		var {room} = this.props.location.query;				
		if(room){						
			setTimeout(()=>{
				this.props.setRoom(room)							
			}, 600)							
		}
	}	
	componentWillReceiveProps(nextProps) {		
		if(this.props.room!=nextProps.room)		
			browserHistory.push(`game?room=${nextProps.room}`)
	}		

	handleClick(e){		
		this.props.resetGame();		
	}

	render(){				
		var clip = new Clipboard('.link');
		
		var renderContent = ()=>{
			var {game, room} = this.props;					
			var gameStatus = game.status;			
			if(gameStatus=='AWAIT' && room){				
				return (
					<div className='dialogue'>
						<p>Copy this link by clicking on it and share it with your opponent. </p>
						<div className='link' data-clipboard-target='#url-to-share' id='url-to-share'>							
							{window.location.href}							
						</div>	
					</div>
				)
			}else if(gameStatus!='AWAIT'&&gameStatus!='START'){
				var text = gameStatus=='DRAW'? gameStatus : 'YOU '+gameStatus;
				return (
					<div className='dialogue'>
						<p>{text}</p>
						<p>Would you like to play another game?</p>
						<button className='btn btn-custom-danger' onClick={this.handleClick.bind(this)}>YES</button>
					</div>
				)
			}		
			return (
				<div className='row'>					
					<div className='col-sm-4'>
						<Board/>
					</div>									
					<div className='col-sm-8'>
						<div className='row'>
							<div className='col-md-6'>					
								<VideoBox/>		
							</div>					
							<div className='col-md-6'>	
								<TextBox/>
							</div>
						</div>	
					</div>
				</div>
			)
		}

		return (
			<div className='container-fluid index-page'>	
				<h1 className='page-title'>
					<span>Tic</span><span>Tac</span><span>Toe</span>
				</h1>
				{renderContent()}							
			</div>	
		);	
	}
}


function mapStateToProps(state) {
	var {game,room, messages} = state;
	return {
		game,
		room,
		messages
	};
}


export default connect(mapStateToProps, {setRoom, resetGame})(IndexPage);