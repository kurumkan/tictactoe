import { combineReducers } from 'redux';
import MessageReducer from 'reducers/MessageReducer';
import RoomReducer from 'reducers/RoomReducer';
import GameReducer from 'reducers/GameReducer';

const RootReducer = combineReducers({
	messages: MessageReducer,
	room: RoomReducer,
	gameStatus: GameReducer
});

export default RootReducer;
