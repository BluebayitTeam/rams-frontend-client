import { combineReducers } from '@reduxjs/toolkit';
import accountSummaryReports from './accountSummaryReportSlice';

const reducer = combineReducers({
	accountSummaryReports
});

export default reducer;
