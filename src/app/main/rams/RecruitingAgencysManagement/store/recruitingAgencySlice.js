import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_RECRUITINGAGENCY,
	DELETE_RECRUITINGAGENCY,
	GET_RECRUITINGAGENCY_BY_ID,
	UPDATE_RECRUITINGAGENCY
} from '../../../../constant/constants';

export const getRecruitingAgency = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgency/getRecruitingAgency',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_RECRUITINGAGENCY_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeRecruitingAgency = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgency/removeRecruitingAgency',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const recruitingAgencyId = val.id;
		const response = await axios.delete(`${DELETE_RECRUITINGAGENCY}${recruitingAgencyId}`, authTOKEN);
		return response;
	}
);

export const updateRecruitingAgency = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgency/updateRecruitingAgency',
	async (recruitingAgencyData, { dispatch, getState }) => {
		const { recruitingAgency } = getState().recruitingAgencysManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(
			`${UPDATE_RECRUITINGAGENCY}${recruitingAgency.id}`,
			recruitingAgencyData,
			authTOKEN
		);
		return response;
	}
);

export const saveRecruitingAgency = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgency/saveRecruitingAgency',
	async recruitingAgencyData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_RECRUITINGAGENCY}`, recruitingAgencyData, authTOKEN);
		return response;
	}
);

const recruitingAgencySlice = createSlice({
	name: 'recruitingAgencyManagement/recruitingAgency',
	initialState: null,
	reducers: {
		resetRecruitingAgency: () => null,
		newRecruitingAgency: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getRecruitingAgency.fulfilled]: (state, action) => action.payload,
		[saveRecruitingAgency.fulfilled]: (state, action) => action.payload,
		[removeRecruitingAgency.fulfilled]: (state, action) => action.payload,
		[updateRecruitingAgency.fulfilled]: (state, action) => action.payload
	}
});

export const { newRecruitingAgency, resetRecruitingAgency } = recruitingAgencySlice.actions;

export default recruitingAgencySlice.reducer;
