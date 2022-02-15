import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_BMET, DELETE_BMET, GET_BMET_BY_ID, UPDATE_BMET } from '../../../../constant/constants';

export const getBmet = createAsyncThunk('bmetManagement/bmet/getBmet', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_BMET_BY_ID}${params}`, authTOKEN);
		const data = await response.data;
		return data || [];
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeBmet = createAsyncThunk('bmetManagement/bmet/removeBmet', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const bmetId = val.id;
	const response = await axios.delete(`${DELETE_BMET}${bmetId}`, authTOKEN);
	return response;
});

export const updateBmet = createAsyncThunk(
	'bmetManagement/bmet/updateBmet',
	async (bmetData, { dispatch, getState }) => {
		const { bmet } = getState().bmetsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_BMET}${bmet.id}`, bmetData, authTOKEN);
		return response;
	}
);

export const saveBmet = createAsyncThunk('bmetManagement/bmet/saveBmet', async bmetData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_BMET}`, bmetData, authTOKEN);
	return response;
});

const bmetSlice = createSlice({
	name: 'bmetManagement/bmet',
	initialState: null,
	reducers: {
		resetBmet: () => null,
		newBmet: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getBmet.fulfilled]: (_state, action) => action.payload,
		[getBmet.rejected]: () => []
	}
});

export const { newBmet, resetBmet } = bmetSlice.actions;

export default bmetSlice.reducer;
