import { combineReducers } from '@reduxjs/toolkit';
import receiptSummaryReports from './receiptSummaryReportSlice';

const reducer = combineReducers({
	receiptSummaryReports
});

export default reducer;
