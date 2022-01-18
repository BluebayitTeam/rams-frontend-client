import { combineReducers } from '@reduxjs/toolkit';
import training from './trainingSlice';

const reducer = combineReducers({
    training,
});

export default reducer;