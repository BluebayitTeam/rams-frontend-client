import { combineReducers } from '@reduxjs/toolkit';
import medical from './medicalSlice';

const reducer = combineReducers({
    medical,
});

export default reducer;
