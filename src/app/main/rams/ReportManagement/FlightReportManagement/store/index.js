import { combineReducers } from '@reduxjs/toolkit';
import flightReports from './flightReportSlice';

const reducer = combineReducers({
	flightReports
});

export default reducer;
