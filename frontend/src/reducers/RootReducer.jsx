import { combineReducers } from 'redux';
import MessageReducer from 'reducers/MessageReducer';

const RootReducer = combineReducers({
	messages: MessageReducer
});

export default RootReducer;
