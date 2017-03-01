import React, { Component } from 'react';
import {Link} from 'react-router';


export default class NotFound404 extends Component{
	render() {
		return (
			<div className="notfound404 jumbotron text-center">
				<h1>Page Not Found</h1>
				<p className="text-danger">Error 404</p>
				<p>The page you requested could not be found, either contact your webmaster or 
				try again. Use your browsers Back button to navigate to the page you have prevously come from</p>
				<p>Or you could just press this neat little button:</p>
				<Link to="/" className="btn btn-custom-danger"><i className="glyphicon glyphicon-home"></i>Take Me Home</Link>
			</div>
		);	
	}
}
