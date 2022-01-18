import { combineReducers } from '@reduxjs/toolkit';
import officeWork from './officeWorkSlice';

const reducer = combineReducers({
    officeWork,
});

export default reducer;