import { combineReducers } from '@reduxjs/toolkit';
import makeAList from './makeAListSlice';
import makeALists from './makeAListsSlice';

const reducer = combineReducers({
	makeAList,
	makeALists
});

export default reducer;
