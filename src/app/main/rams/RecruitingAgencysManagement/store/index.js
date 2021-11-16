import { combineReducers } from '@reduxjs/toolkit';
import recruitingAgency from './recruitingAgencySlice';
import recruitingAgencys from './recruitingAgencysSlice';

const reducer = combineReducers({
    recruitingAgency,
    recruitingAgencys,
});

export default reducer;