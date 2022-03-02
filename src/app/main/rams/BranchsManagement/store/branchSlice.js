import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_BRANCH, DELETE_BRANCH, GET_BRANCHID, UPDATE_BRANCH } from '../../../../constant/constants';

export const getBranch = createAsyncThunk('branchManagement/branch/getBranch', async (params, { rejectWithValue }) => {
	console.log(params);
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_BRANCHID}${params}`, authTOKEN);
		console.log(response);
		const data = await response.data;
		console.log(data);
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeBranch = createAsyncThunk(
	'branchManagement/branch/removeBranch',
	async (val, { dispatch, getState }) => {
		console.log(val);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const branchId = val.id;
		const response = await axios.delete(`${DELETE_BRANCH}${branchId}`, authTOKEN);
		return response;
	}
);

export const updateBranch = createAsyncThunk(
	'branchManagement/branch/updateBranch',
	async (branchData, { dispatch, getState }) => {
		console.log(branchData);
		const { branch } = getState().branchsManagement;
		console.log(branch);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_BRANCH}${branch.id}`, branchData, authTOKEN);
		return response;
	}
);

export const saveBranch = createAsyncThunk(
	'branchManagement/branch/saveBranch',
	async (branchData, { dispatch, getState }) => {
		//console.log(branchData);
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_BRANCH}`, branchData, authTOKEN);
		return response;
	}
);

const branchSlice = createSlice({
	name: 'branchManagement/branch',
	initialState: null,
	reducers: {
		resetBranch: () => null,
		newBranch: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					name: '',
					short_desc: '',
					full_desc: '',
					is_active: false,
					street_address_one: '',
					street_address_two: '',
					postal_code: '',
					thana: 0,
					city: 0,
					country: 0
				}
			})
		}
	},
	extraReducers: {
		[getBranch.fulfilled]: (state, action) => action.payload,
		[saveBranch.fulfilled]: (state, action) => action.payload,
		[removeBranch.fulfilled]: (state, action) => action.payload,
		[updateBranch.fulfilled]: (state, action) => action.payload
	}
});

export const { newBranch, resetBranch } = branchSlice.actions;

export default branchSlice.reducer;
