import React, { Component } from 'react';
import Board from 'components/Board';
import VideoBox from 'components/VideoBox';
import TextBox from 'components/TextBox';

export default class IndexPage extends Component{
	render() {		
		return (
			<div className='container-fluid index-page'>	
				<h1 className='page-title'>
					<span>Tic</span><span>Tac</span><span>Toe</span>
				</h1>			
				<div className='row'>					
					<div className='col-sm-5'>
						<Board/>
					</div>									
					<div className='col-sm-7'>
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


