import { combineReducers } from '@reduxjs/toolkit';
import branch from './branchSlice';
import branchs from './branchsSlice';

const reducer = combineReducers({
	branch,
	branchs,
});

export default reducer;