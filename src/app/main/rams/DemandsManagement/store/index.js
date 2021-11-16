import { combineReducers } from '@reduxjs/toolkit';
import demand from './demandSlice';
import demands from './demandsSlice';

const reducer = combineReducers({
    demand,
    demands,
});

export default reducer;