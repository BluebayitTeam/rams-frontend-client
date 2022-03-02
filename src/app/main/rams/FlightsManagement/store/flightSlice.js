import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_FLIGHT, DELETE_FLIGHT, UPDATE_FLIGHT } from '../../../../constant/constants';

export const removeFlight = createAsyncThunk('flightManagement/flight/removeFlight', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const flightId = val.id;
	const response = await axios.delete(`${DELETE_FLIGHT}${flightId}`, authTOKEN);
	return response;
});

export const updateFlight = createAsyncThunk('flightManagement/flight/updateFlight', async flightData => {
	const flightDatas = { ...flightData, created_by: '' };
	function buildFormData(formData, data, parentKey) {
		if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
			Object.keys(data).forEach(key => {
				buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
			});
		} else {
			const value = data == null ? '' : data;

			formData.append(parentKey, value);
		}
	}

	function jsonToFormData(data) {
		const formData = new FormData();

		buildFormData(formData, data);

		return formData;
	}

	const getFormDateFJ = jsonToFormData(flightDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_FLIGHT}${flightData.id}`, getFormDateFJ, authTOKEN);
	return response;
});

export const saveFlight = createAsyncThunk('flightManagement/flight/saveFlight', async flightData => {
	const flightDatas = { ...flightData, updated_by: '' };
	function buildFormData(formData, data, parentKey) {
		if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
			Object.keys(data).forEach(key => {
				buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
			});
		} else {
			const value = data == null ? '' : data;

			formData.append(parentKey, value);
		}
	}

	function jsonToFormData(data) {
		const formData = new FormData();

		buildFormData(formData, data);

		return formData;
	}

	const getFormDateFJ = jsonToFormData(flightDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_FLIGHT}`, getFormDateFJ, authTOKEN);
	return response;
});

const flightSlice = createSlice({
	name: 'flightManagement/flight',
	initialState: null,
	reducers: {
		resetFlight: () => null,
		newFlight: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveFlight.fulfilled]: (state, action) => action.payload,
		[removeFlight.fulfilled]: (state, action) => action.payload,
		[updateFlight.fulfilled]: (state, action) => action.payload
	}
});

export const { newFlight, resetFlight } = flightSlice.actions;

export default flightSlice.reducer;
