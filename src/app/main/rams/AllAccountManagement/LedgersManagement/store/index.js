import { combineReducers } from '@reduxjs/toolkit';
import ledger from './ledgerSlice';
import ledgers from './ledgersSlice';

const reducer = combineReducers({
	ledger,
	ledgers
});

export default reducer;
