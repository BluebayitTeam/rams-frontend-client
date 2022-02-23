import { combineReducers } from '@reduxjs/toolkit';
import makeAListClm from './makeAListClmSlice';
import makeAListReport from './makeAListReportSlice';
import makeAListRow from './makeAListRowSlice';
import makeAList from './makeAListSlice';
import makeALists from './makeAListsSlice';

const reducer = combineReducers({
	makeAList,
	makeALists,
	makeAListClm,
	makeAListRow,
	makeAListReport
});

export default reducer;
