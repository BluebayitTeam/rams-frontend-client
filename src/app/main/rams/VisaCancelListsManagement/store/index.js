import { combineReducers } from '@reduxjs/toolkit';
import visaCancelList from './visaCancelListSlice';

const reducer = combineReducers({
    visaCancelList,
});

export default reducer;