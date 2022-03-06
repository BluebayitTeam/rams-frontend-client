import { combineReducers } from '@reduxjs/toolkit';
import journal from './journalSlice';
import journals from './journalsSlice';

const reducer = combineReducers({
	journal,
	journals
});

export default reducer;
