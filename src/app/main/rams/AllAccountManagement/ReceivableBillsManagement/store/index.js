import { combineReducers } from '@reduxjs/toolkit';
import receivableBill from './receivableBillSlice';
import receivableBills from './receivableBillsSlice';

const reducer = combineReducers({
	receivableBill,
	receivableBills
});

export default reducer;
