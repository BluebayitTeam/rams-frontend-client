import { combineReducers } from '@reduxjs/toolkit';
import embassy from './embassySlice';

const reducer = combineReducers({
    embassy,
});

export default reducer;