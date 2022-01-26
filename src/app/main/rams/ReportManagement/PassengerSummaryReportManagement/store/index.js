import { combineReducers } from '@reduxjs/toolkit';
import passengerSummaryReports from './passengerSummaryReportSlice';

const reducer = combineReducers({
	passengerSummaryReports
});

export default reducer;
