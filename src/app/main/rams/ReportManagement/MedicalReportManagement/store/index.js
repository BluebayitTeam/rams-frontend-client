import { combineReducers } from '@reduxjs/toolkit';
import medicalReports from './medicalReportSlice';

const reducer = combineReducers({
	medicalReports
});

export default reducer;
