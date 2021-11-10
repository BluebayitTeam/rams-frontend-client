import { combineReducers } from '@reduxjs/toolkit';
import passengerType from './passengerTypeSlice';
import passengerTypes from './passengerTypesSlice';

const reducer = combineReducers({
    passengerType,
    passengerTypes,
});

export default reducer;