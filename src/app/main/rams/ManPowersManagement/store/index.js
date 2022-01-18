import { combineReducers } from '@reduxjs/toolkit';
import manPower from './manPowerSlice';

const reducer = combineReducers({
    manPower,
});

export default reducer;
