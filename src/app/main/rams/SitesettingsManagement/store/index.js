import { combineReducers } from '@reduxjs/toolkit';
import sitesetting from './sitesettingSlice';
import sitesettings from './sitesettingsSlice';

const reducer = combineReducers({
	sitesetting,
	sitesettings,
});

export default reducer;