import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { CREATE_KSAVISA, DELETE_KSAVISA, GET_KSAVISA_BY_ID, UPDATE_KSAVISA } from '../../../../constant/constants';

export const getKsaVisa = createAsyncThunk(
	'ksaVisaManagement/ksaVisa/getKsaVisa',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_KSAVISA_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data || {};
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeKsaVisa = createAsyncThunk('ksaVisaManagement/ksaVisa/removeKsaVisa', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const ksaVisaId = val.id;
	const response = await axios.delete(`${DELETE_KSAVISA}${ksaVisaId}`, authTOKEN);
	return response;
});

export const updateKsaVisa = createAsyncThunk(
	'ksaVisaManagement/ksaVisa/updateKsaVisa',
	async (ksaVisaData, { dispatch, getState }) => {
		const { ksaVisa } = getState().ksaVisasManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_KSAVISA}${ksaVisa.id}`, ksaVisaData, authTOKEN);
		return response;
	}
);

export const saveKsaVisa = createAsyncThunk('ksaVisaManagement/ksaVisa/saveKsaVisa', async ksaVisaData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_KSAVISA}`, ksaVisaData, authTOKEN);
	return response;
});

const ksaVisaSlice = createSlice({
	name: 'ksaVisaManagement/ksaVisa',
	initialState: null,
	reducers: {
		resetKsaVisa: () => null,
		newKsaVisa: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getKsaVisa.fulfilled]: (_state, action) => (_.isArray(action.payload) ? action.payload : []),
		[getKsaVisa.rejected]: () => []
	}
});

export const { newKsaVisa, resetKsaVisa } = ksaVisaSlice.actions;

export default ksaVisaSlice.reducer;
