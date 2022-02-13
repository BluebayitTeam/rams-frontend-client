import { combineReducers } from '@reduxjs/toolkit';
import ledgerReports from './ledgerReportSlice';

const reducer = combineReducers({
	ledgerReports
});

export default reducer;
