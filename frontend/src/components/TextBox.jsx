import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendMessage} from 'actions/Actions';

class TextBox extends Component{
	constructor(props) {
		super(props);
		this.state={value:''};		
	}	
	handleChange(e){		
		var {value} = e.target;			

		//send message on press [Return]
		if(value.charCodeAt(value.length-1)==10){
			var value = this.state.value.trim();			
			if(value){
				this.setState({value: ''});		
				this.props.sendMessage(value);
			}			
		}else{
			this.setState({value});			
		}		
	}	
	componentDidUpdate(prevProps, prevState) {
		//scroll .message-box down
		var {messageBox} = this;		 
		messageBox.scrollTop = messageBox.scrollHeight; 					
	}
	render() {		
		var {messages, game} = this.props;
		var gameStatus = game.status;
		var style = {background: gameStatus=='START'?'green':'#cf4242'};
		var statusText = gameStatus=='START'?'Opponent is connected':'No opponent yet';			

		var renderMessages = messages.map((m, i)=>{
			var className=m.remote?'opponent':'me'
			var {text}=m;
			return (
			<p key={i} className={className}>
				{text}
			</p>)
		});		
		
		return (
			<div className='text-box'>
				<span>
					<div className='is-ready' style={style}></div>{statusText}
				</span>
				<div id='message-box' ref={(div)=>{this.messageBox=div;}}>					
					{renderMessages}					
				</div>				
				<textarea 
					value={this.state.value} 
					onChange={this.handleChange.bind(this)} 
					
				/>				
			</div>
		);		
	}
}

function mapStateToProps(state) {
	var {messages, game} = state;
	return {
		messages,
		game		
	};
}

export default connect(mapStateToProps, {sendMessage})(TextBox);