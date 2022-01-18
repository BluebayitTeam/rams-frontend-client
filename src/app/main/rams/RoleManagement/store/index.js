import { combineReducers } from '@reduxjs/toolkit';
import role from './roleSlice';
import roles from './rolesSlice';


const reducer = combineReducers({
    role,
    roles
})

export default reducer;