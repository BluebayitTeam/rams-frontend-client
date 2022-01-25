import { combineReducers } from '@reduxjs/toolkit';
import trainingReports from './trainingReportSlice';

const reducer = combineReducers({
	trainingReports
});

export default reducer;
