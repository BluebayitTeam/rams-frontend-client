import { combineReducers } from '@reduxjs/toolkit';
import menu from './menuSlice';
import menus from './menusSlice';

const reducer = combineReducers({
    menu,
    menus,
});

export default reducer;