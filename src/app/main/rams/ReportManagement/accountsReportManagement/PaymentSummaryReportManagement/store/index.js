import { combineReducers } from '@reduxjs/toolkit';
import paymentSummaryReports from './paymentSummaryReportSlice';

const reducer = combineReducers({
	paymentSummaryReports
});

export default reducer;
