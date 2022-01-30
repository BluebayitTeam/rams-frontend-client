import { combineReducers } from '@reduxjs/toolkit';
import group from './groupSlice';
import groups from './groupsSlice';

const reducer = combineReducers({
	group,
	groups
});

export default reducer;
