import { combineReducers } from '@reduxjs/toolkit';
import payableBill from './payableBillSlice';
import payableBills from './payableBillsSlice';

const reducer = combineReducers({
	payableBill,
	payableBills
});

export default reducer;
