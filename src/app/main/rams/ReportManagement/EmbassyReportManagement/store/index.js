import { combineReducers } from '@reduxjs/toolkit';
import medicalReports from './embassyReportSlice';

const reducer = combineReducers({
	medicalReports
});

export default reducer;
