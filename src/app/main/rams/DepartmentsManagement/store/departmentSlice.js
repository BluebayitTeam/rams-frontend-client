import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	GET_DEPARTMENTID,
	UPDATE_DEPARTMENT
} from '../../../../constant/constants';

export const getDepartment = createAsyncThunk(
	'departmentManagement/department/getDepartment',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_DEPARTMENTID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeDepartment = createAsyncThunk('departmentManagement/department/removeDepartment', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const departmentId = val.id;
	const response = await axios.delete(`${DELETE_DEPARTMENT}${departmentId}`, authTOKEN);
	return response;
});

export const updateDepartment = createAsyncThunk(
	'departmentManagement/department/updateDepartment',
	async (departmentData, { dispatch, getState }) => {
		const { department } = getState().departmentsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_DEPARTMENT}${department.id}`, departmentData, authTOKEN);
		return response;
	}
);

export const saveDepartment = createAsyncThunk(
	'departmentManagement/department/saveDepartment',
	async (departmentData, { dispatch, getState }) => {
		console.log(departmentData);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_DEPARTMENT}`, departmentData, authTOKEN);
		return response;
	}
);

const departmentSlice = createSlice({
	name: 'departmentManagement/department',
	initialState: null,
	reducers: {
		resetDepartment: () => null,
		newDepartment: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: null,
					name: ''
				}
			})
		}
	},
	extraReducers: {
		[getDepartment.fulfilled]: (state, action) => action.payload,
		[saveDepartment.fulfilled]: (state, action) => action.payload,
		[removeDepartment.fulfilled]: (state, action) => action.payload,
		[updateDepartment.fulfilled]: (state, action) => action.payload
	}
});

export const { newDepartment, resetDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
