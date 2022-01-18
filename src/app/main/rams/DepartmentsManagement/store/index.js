import { combineReducers } from '@reduxjs/toolkit';
import department from './departmentSlice';
import departments from './departmentsSlice';


const reducer = combineReducers({
    department,
    departments
});

export default reducer;