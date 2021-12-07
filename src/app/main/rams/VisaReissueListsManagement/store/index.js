import { combineReducers } from '@reduxjs/toolkit';
import visaReissueList from './visaReissueListSlice';

const reducer = combineReducers({
    visaReissueList,
});

export default reducer;