import React, { Component } from 'react';

export default class TextBox extends Component{
	constructor(props) {
		super(props);
		this.state={value:''};
	}
	handleChange(e){		
		this.setState({
			value: e.target.value
		})
	}
	handleKeyPress(target){
		if(target.charCode==13){
			var value = this.state.value.trim();			
			if(value){
				this.setState({value: ''});				
			}			
		}
	}
	render() {
		return (
			<div className='text-box'>
				<span>
					<div className='is-online'></div>No opponent yet
				</span>
				<div id='message-box'>					
				</div>				
				<textarea value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>				
			</div>
		);		
	}
}
