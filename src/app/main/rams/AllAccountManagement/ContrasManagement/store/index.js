import { combineReducers } from '@reduxjs/toolkit';
import contra from './contraSlice';
import contras from './contrasSlice';

const reducer = combineReducers({
	contra,
	contras
});

export default reducer;
