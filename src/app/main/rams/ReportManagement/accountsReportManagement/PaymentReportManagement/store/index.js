import { combineReducers } from '@reduxjs/toolkit';
import receiptReports from './paymentReportSlice';

const reducer = combineReducers({
	receiptReports
});

export default reducer;
