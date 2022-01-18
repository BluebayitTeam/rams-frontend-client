import { combineReducers } from '@reduxjs/toolkit';
import thana from './thanaSlice';
import thanas from './thanasSlice';

const reducer = combineReducers({
	thana,
	thanas,
});

export default reducer;