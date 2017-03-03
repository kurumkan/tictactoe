import React, { Component } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';


import {setRoom} from 'actions/Actions';
import Board from 'components/Board';
import VideoBox from 'components/VideoBox';
import TextBox from 'components/TextBox';

class IndexPage extends Component{
	componentWillMount() {	
		var {room} = this.props.location.query;			
		if(room){						
			setTimeout(()=>{
				this.props.setRoom(room)							
			}, 300)							
		}
	}	

	render(){
		var {gameStatus, room} = this.props;					
		if(gameStatus!='START' && room){						
			return (
				<div>
					Please follow copy this link and shre with your opponent<br/>
					http://localhost:5000/game?room={room}
				</div>
			)
		}

		return (
			<div className='container-fluid index-page'>	
				<h1 className='page-title'>
					<span>Tic</span><span>Tac</span><span>Toe</span>
				</h1>			
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
			</div>	
		);	
	}
}


function mapStateToProps(state) {
	var {gameStatus,room, messages} = state;
	return {
		gameStatus,
		room,
		messages
	};
}


export default connect(mapStateToProps, {setRoom})(IndexPage);