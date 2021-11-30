import { combineReducers } from '@reduxjs/toolkit';
import medicalCenter from './medicalCenterSlice';

const reducer = combineReducers({
    medicalCenter,
});

export default reducer;