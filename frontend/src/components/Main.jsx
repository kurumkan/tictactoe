import React, { Component } from 'react';

//root component
export default class Main extends Component{
	render() {		
		return (
			<div className='container-fluid main'>
				<div className='row'>					
					{this.props.children}						
				</div>	
			</div>	
		);	
	}
}


