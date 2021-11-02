import { combineReducers } from '@reduxjs/toolkit';
import employee from './employeeSlice';
import employees from './employeesSlice';
import usersList from './usersSlice';

const reducer = combineReducers({
	employee,
	employees,
	usersList
});

export default reducer;
