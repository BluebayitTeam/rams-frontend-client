import { combineReducers } from '@reduxjs/toolkit';
import medicalCenter from './medicalCenterSlice';
import medicalCenters from './medicalCentersSlice';

const reducer = combineReducers({
    medicalCenter,
    medicalCenters,
});

export default reducer;