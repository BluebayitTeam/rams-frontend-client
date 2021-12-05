import { combineReducers } from '@reduxjs/toolkit';
import flight from './flightSlice';

const reducer = combineReducers({
    flight,
});

export default reducer;