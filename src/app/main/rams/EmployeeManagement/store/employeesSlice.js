import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_EMPLOYEE, GET_EMPLOYEES } from '../../../../constant/constants';

export const getEmployees = createAsyncThunk('employeeManagement/users/getUsers', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_EMPLOYEES, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_employees_elements', data.data.total_elements);
	sessionStorage.setItem('total_employees_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.employees;
});

export const removeEmployees = createAsyncThunk(
	'eCommerceApp/products/removeEmployees',
	async (employeeIds, { dispatch, getState }) => {
		await axios.delete(`${DELETE_EMPLOYEE}`, { employeeIds });

		return employeeIds;
	}
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectEmployees, selectById: selectEmployeeById } = usersAdapter.getSelectors(
	state => state.employeesManagement.employees
);

const employeesSlice = createSlice({
	name: 'employeeManagement/employees',
	initialState: usersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setEmployeesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getEmployees.fulfilled]: usersAdapter.setAll
	}
});

export const { setData, setEmployeesSearchText } = employeesSlice.actions;
export default employeesSlice.reducer;
