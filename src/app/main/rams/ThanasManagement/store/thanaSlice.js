import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_THANA, DELETE_THANA, GET_THANAID, UPDATE_THANA } from '../../../../constant/constants';

export const getThana = createAsyncThunk('thanaManagement/thana/getThana', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_THANAID}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeThana = createAsyncThunk('thanaManagement/thana/removeThana', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const thanaId = val.id;
	const response = await axios.delete(`${DELETE_THANA}${thanaId}`, authTOKEN);
	return response;
});

export const updateThana = createAsyncThunk(
	'thanaManagement/thana/updateThana',
	async (thanaData, { dispatch, getState }) => {
		const { thana } = getState().thanasManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_THANA}${thana.id}`, thanaData, authTOKEN);
		return response;
	}
);

export const saveThana = createAsyncThunk('thanaManagement/thana/saveThana', async thanaData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_THANA}`, thanaData, authTOKEN);
	return response;
});

const thanaSlice = createSlice({
	name: 'thanaManagement/thana',
	initialState: null,
	reducers: {
		resetThana: () => null,
		newThana: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getThana.fulfilled]: (state, action) => action.payload,
		[saveThana.fulfilled]: (state, action) => action.payload,
		[removeThana.fulfilled]: (state, action) => action.payload,
		[updateThana.fulfilled]: (state, action) => action.payload
	}
});

export const { newThana, resetThana } = thanaSlice.actions;

export default thanaSlice.reducer;
