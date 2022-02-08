import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_PROFESSION,
	DELETE_PROFESSION,
	GET_PROFESSION_BY_ID,
	UPDATE_PROFESSION
} from '../../../../constant/constants';

export const getProfession = createAsyncThunk(
	'professionManagement/profession/getProfession',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_PROFESSION_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeProfession = createAsyncThunk('professionManagement/profession/removeProfession', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const professionId = val.id;
	const response = await axios.delete(`${DELETE_PROFESSION}${professionId}`, authTOKEN);
	return response;
});

export const updateProfession = createAsyncThunk(
	'professionManagement/profession/updateProfession',
	async (professionData, { dispatch, getState }) => {
		const { profession } = getState().professionsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_PROFESSION}${profession.id}`, professionData, authTOKEN);
		return response;
	}
);

export const saveProfession = createAsyncThunk(
	'professionManagement/profession/saveProfession',
	async professionData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_PROFESSION}`, professionData, authTOKEN);
		return response;
	}
);

const professionSlice = createSlice({
	name: 'professionManagement/profession',
	initialState: null,
	reducers: {
		resetProfession: () => null,
		newProfession: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getProfession.fulfilled]: (state, action) => action.payload,
		[saveProfession.fulfilled]: (state, action) => action.payload,
		[removeProfession.fulfilled]: (state, action) => action.payload,
		[updateProfession.fulfilled]: (state, action) => action.payload
	}
});

export const { newProfession, resetProfession } = professionSlice.actions;

export default professionSlice.reducer;
