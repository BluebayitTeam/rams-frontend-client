import { combineReducers } from '@reduxjs/toolkit';
import maleCV from './maleCVSlice';

const reducer = combineReducers({
    maleCV,
});

export default reducer;