import React, { Component } from 'react';

export default class Board extends Component{
	render() {
		return (
			<div className='board'>
				<table>
					<tbody>
						<tr>
							<td id='c00'></td>
							<td id='c01'></td>
							<td id='c02'></td>
						</tr>
						<tr>
							<td id='c10'></td>
							<td id='c11'></td>
							<td id='c12'></td>
						</tr>
						<tr>
							<td id='c20'></td>
							<td id='c21'></td>
							<td id='c22'></td>
						</tr>
					</tbody>
				</table>
			</div>
		);		
	}
}
