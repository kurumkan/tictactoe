import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';
import io from 'socket.io-client';

// App css
require('style!css!sass!applicationStyles');

import RootReducer from 'reducers/RootReducer';

import Main from 'components/Main';
import IndexPage from 'components/IndexPage';
import NotFound404 from 'components/NotFound404';

import RemoteActionMiddleware from 'middlewares/RemoteActionMiddleware';
import {receiveMessage, setGameStatus, setRoom} from 'actions/Actions';

var socket = io(window.location.host);
var createStoreWithMiddleware = applyMiddleware(ReduxThunk, RemoteActionMiddleware(socket))(createStore);
var store = createStoreWithMiddleware(RootReducer);

socket.on('room',(room)=>{		
	store.dispatch(setRoom(room))		
});

socket.on('message', (data)=>{		
	store.dispatch(receiveMessage(data))	
});

socket.on('start', (data)=>{		
	store.dispatch(setGameStatus('START'));	
});

socket.on('refuse', ()=>{		
	browserHistory.push('404')
	setRoom('');
});

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={IndexPage} />
				<Route path='game' component={IndexPage}>
					<Route path='?room=:room' component={IndexPage} />					
				</Route>												
			 	<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />
			</Route>
		</Router>				
	</Provider>
  , document.querySelector('#app'));
