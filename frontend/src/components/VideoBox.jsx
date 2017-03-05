import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoBox extends Component{		
	componentWillUpdate(nextProps, nextState) {			
		if(nextProps.game.status=='START'&&!this.props.game.symbol){						
			var roomId = nextProps.room;
			var port = process.env.PORT || 8080;
			var url = 'http://'+window.location.hostname+':'+ port;
			console.log(url)			
			var rtcOpts = {
				room: roomId,            
				signaller: url
			};
			// call RTC module
			var rtc = RTC(rtcOpts);

			this.localVideo.innerHTML='';
			this.remoteVideo.innerHTML='';

			// A div element to show our local video stream			
			var localVideo = this.localVideo;
			// A div element to show our remote video streams			
			var remoteVideo = this.remoteVideo;		

			// Start working with the established session
			function init(session) {
				session.createDataChannel('chat');				
			}
			// Detect when RTC has established a session
			rtc.on('ready', init);
		}
	}
	render() {
		return (
			<div className='video-box'>
				<div id="l-video" ref={(div) => { this.localVideo = div; }}></div>
				<div id="r-video" ref={(div) => { this.remoteVideo = div; }}></div>
			</div>
		);		
	}
}


function mapStateToProps(state) {
	var {room, game} = state;
	return {
		room,
		game	
	};
}
export default connect(mapStateToProps, null)(VideoBox);