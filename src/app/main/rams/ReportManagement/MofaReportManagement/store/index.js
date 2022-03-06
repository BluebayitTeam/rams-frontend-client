import { combineReducers } from '@reduxjs/toolkit';
import mofaReports from './mofaReportSlice';

const reducer = combineReducers({
	mofaReports
});

export default reducer;
