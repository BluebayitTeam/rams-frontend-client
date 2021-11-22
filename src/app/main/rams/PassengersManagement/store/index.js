import { combineReducers } from '@reduxjs/toolkit';
import passenger from './passengerSlice';
import passengers from './passengersSlice';

const reducer = combineReducers({
    passenger,
    passengers,
});

export default reducer;
