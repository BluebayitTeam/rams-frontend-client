import { combineReducers } from '@reduxjs/toolkit';
import visaSubmissionList from './visaSubmissionListSlice';

const reducer = combineReducers({
    visaSubmissionList,
});

export default reducer;