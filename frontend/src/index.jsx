import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';
import uuid from 'uuid';
import io from 'socket.io-client';

// App css
require('style!css!sass!applicationStyles');

import RootReducer from 'reducers/RootReducer';

import Main from 'components/Main';
import IndexPage from 'components/IndexPage';
import NotFound404 from 'components/NotFound404';
import RemoteActionMiddleware from './middlewares/RemoteActionMiddleware';

var socket = io(window.location.host);
var room = uuid();
socket.on('connect', function() {
   // Connected, let's sign-up for to receive messages for this room
   socket.emit('room', room);
});
socket.on('message', function(data) {	
	console.log('Incoming message:', data);
	alert(data)
});
socket.emit('fromclient', {"room":room,"message":"hello world"});


var createStoreWithMiddleware = applyMiddleware(ReduxThunk, RemoteActionMiddleware(socket))(createStore);
var store = createStoreWithMiddleware(RootReducer);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={IndexPage} />				
			 	<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />
			</Route>
		</Router>				
	</Provider>
  , document.querySelector('#app'));
