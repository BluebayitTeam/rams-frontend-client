import { combineReducers } from '@reduxjs/toolkit';
import passengerReports from './passengerReportSlice';

const reducer = combineReducers({
    passengerReports
});

export default reducer;