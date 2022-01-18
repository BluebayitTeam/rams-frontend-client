import { combineReducers } from '@reduxjs/toolkit';
import manPowerList from './manPowerListSlice';

const reducer = combineReducers({
    manPowerList,
});

export default reducer;