import { combineReducers } from '@reduxjs/toolkit';
import city from './citySlice';
import citys from './citysSlice';

const reducer = combineReducers({
	city,
	citys,
});

export default reducer;