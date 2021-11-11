import { combineReducers } from '@reduxjs/toolkit';
import currentStatus from './currentStatusSlice';
import currentStatuss from './currentStatussSlice';

const reducer = combineReducers({
    currentStatus,
    currentStatuss,
});

export default reducer;