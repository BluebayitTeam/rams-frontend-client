import { combineReducers } from '@reduxjs/toolkit';
import makeAListClms from './makeAListClmSlice';
import makeAListReport from './makeAListReportSlice';
import makeAListRows from './makeAListRowSlice';
import makeAList from './makeAListSlice';
import makeALists from './makeAListsSlice';

const reducer = combineReducers({
	makeAList,
	makeALists,
	makeAListClms,
	makeAListRows,
	makeAListReport
});

export default reducer;
