import { combineReducers } from '@reduxjs/toolkit';
import receiptReports from './receiptReportSlice';

const reducer = combineReducers({
	receiptReports
});

export default reducer;
