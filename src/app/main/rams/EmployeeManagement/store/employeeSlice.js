import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from '../../../../constant/constants';

export const getEmployee = createAsyncThunk('employeeManagement/employee/getEmployee', async params => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.get(`${GET_EMPLOYEE_BY_ID}${params.employeeId}`, authTOKEN);
	const data = await response.data;
	return data === undefined ? null : data;
});

export const removeEmployee = createAsyncThunk('employeeManagement/employee/removeEmployee', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const employeeId = val.id;
	const response = await axios.delete(`${DELETE_EMPLOYEE}${employeeId}`, authTOKEN);
	return response;
});

//buildformdata
const buildFormData = (formData, data, parentKey) => {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach(key => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		const value = data === null ? '' : data;

		formData.append(parentKey, value);
	}
};

//convertJsonToFormData
const jsonToFormData = data => {
	const formData = new FormData();

	buildFormData(formData, data);
	return formData;
};

export const updateEmployee = createAsyncThunk(
	'employeeManagement/employee/updateEmployee',
	async (employeeData, { dispatch, getState }) => {
		console.log(employeeData);
		const employeeDataToFormData = jsonToFormData(employeeData);
		console.log(employeeDataToFormData);
		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const { employee } = getState().employeesManagement;
		//const updatedEmployeeData = { ...employee, ...employeeData };

		const response = await axios.put(`${UPDATE_EMPLOYEE}${employee.id}`, employeeDataToFormData, authTOKEN);
		return response;
	}
);

export const saveEmployee = createAsyncThunk(
	'employeeManagement/employee/saveEmployee',
	async (employeeData, { dispatch, getState }) => {
		console.log(employeeData);
		const employeeDataToFormData = jsonToFormData(employeeData);
		console.log(employeeDataToFormData);
		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_EMPLOYEE}`, employeeDataToFormData, authTOKEN);
		return response;
	}
);

const employeeSlice = createSlice({
	name: 'employeeManagement/employee',
	initialState: null,
	reducers: {
		resetEmployee: () => null,
		newEmployee: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					branch: 0,
					emp_id_no: '',
					first_name: '',
					last_name: '',
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
					primary_phone: '',
					secondary_phone: '',
					street_address_one: '',
					street_address_two: '',
					date_of_birth: '',
					gender: '',
					thana: 0,
					city: 0,
					image: '',
					country: 0,
					postal_code: '',
					nid: '',
					role: 0,
					department: 0,
					basic_money: 0,
					allowance_money: 0,
					emp_join_date: '',
					is_active: false,
					is_admin: false,
					policeStation: '',
					district: '',
					active: false,
					country_code1: '+880',
					country_code2: '+880',
					show_country_code1: '+880',
					show_country_code2: '+880'
				}
			})
		}
	},
	extraReducers: {
		[getEmployee.fulfilled]: (state, action) => action.payload,
		[saveEmployee.fulfilled]: (state, action) => action.payload,
		[removeEmployee.fulfilled]: (state, action) => action.payload,
		[updateEmployee.fulfilled]: (state, action) => action.payload
	}
});

export const { newEmployee, resetEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
