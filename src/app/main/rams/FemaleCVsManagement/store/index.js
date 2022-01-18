import { combineReducers } from '@reduxjs/toolkit';
import femaleCV from './femaleCVSlice';

const reducer = combineReducers({
    femaleCV,
});

export default reducer;