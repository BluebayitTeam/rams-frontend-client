import { combineReducers } from '@reduxjs/toolkit';
import permission from './permissionSlice';
import permissions from './permissionsSlice';


const reducer = combineReducers({
	permission,
	permissions,
});

export default reducer;