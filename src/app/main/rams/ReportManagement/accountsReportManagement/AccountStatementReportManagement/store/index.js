import { combineReducers } from '@reduxjs/toolkit';
import accountStatementReports from './accountStatementReportSlice';

const reducer = combineReducers({
	accountStatementReports
});

export default reducer;
