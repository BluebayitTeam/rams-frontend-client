import { combineReducers } from '@reduxjs/toolkit';
import subLedger from './subLedgerSlice';
import subLedgers from './subLedgersSlice';

const reducer = combineReducers({
	subLedger,
	subLedgers
});

export default reducer;
