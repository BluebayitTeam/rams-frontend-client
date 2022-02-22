import { combineReducers } from '@reduxjs/toolkit';
import makeALists from './makeAListReportSlice';

const reducer = combineReducers({
	makeALists
});

export default reducer;
