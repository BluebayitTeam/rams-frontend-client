import { combineReducers } from '@reduxjs/toolkit';
import makeAListClms from './makeAListClmSlice';
import makeAListTableClms from './makeAListReportSlice';
import makeAListRows from './makeAListRowSlice';
import makeAList from './makeAListSlice';
import makeALists from './makeAListsSlice';

const reducer = combineReducers({
	makeAList,
	makeALists,
	makeAListClms,
	makeAListRows,
	makeAListTableClms
});

export default reducer;
