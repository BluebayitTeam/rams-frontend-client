import { combineReducers } from '@reduxjs/toolkit';
import searchText from './searchTextSlice';

const reducer = combineReducers({
	searchText
});
export default reducer;
