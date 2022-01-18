import { combineReducers } from '@reduxjs/toolkit';
import profession from './professionSlice';
import professions from './professionsSlice';

const reducer = combineReducers({
    profession,
    professions,
});

export default reducer;