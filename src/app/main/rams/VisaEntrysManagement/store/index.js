import { combineReducers } from '@reduxjs/toolkit';
import visaEntry from './visaEntrySlice';
import visaEntrys from './visaEntrysSlice';

const reducer = combineReducers({
    visaEntry,
    visaEntrys,
});

export default reducer;
