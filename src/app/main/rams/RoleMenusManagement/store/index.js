import { combineReducers } from '@reduxjs/toolkit';
import roleMenu from './roleMenuSlice';
import roleMenus from './roleMenusSlice';

const reducer = combineReducers({
    roleMenu,
    roleMenus,
});

export default reducer;