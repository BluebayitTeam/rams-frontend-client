import { combineReducers } from '@reduxjs/toolkit';
import qualification from './qualificationSlice';
import qualifications from './qualificationsSlice';

const reducer = combineReducers({
	qualification,
	qualifications,
});

export default reducer;