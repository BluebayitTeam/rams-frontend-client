import { combineReducers } from '@reduxjs/toolkit';
import mofa from './mofaSlice';

const reducer = combineReducers({
    mofa,
});

export default reducer;