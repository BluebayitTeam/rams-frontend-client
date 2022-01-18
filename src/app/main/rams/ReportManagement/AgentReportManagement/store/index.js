import { combineReducers } from '@reduxjs/toolkit';
import agentReports from './agentReportSlice';

const reducer = combineReducers({
	agentReports
});

export default reducer;
