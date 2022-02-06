import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_PASSENGER,
	DELETE_PASSENGER,
	GET_PASSENGER_BY_ID,
	UPDATE_PASSENGER
} from '../../../../constant/constants';

export const getPassenger = createAsyncThunk(
	'passengerManagement/passenger/getPassenger',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_PASSENGER_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removePassenger = createAsyncThunk('passengerManagement/passenger/removePassenger', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const passengerId = val.id;
	const response = await axios.delete(`${DELETE_PASSENGER}${passengerId}`, authTOKEN);
	return response;
});

export const updatePassenger = createAsyncThunk(
	'passengerManagement/passenger/updatePassenger',
	async (passengerData, { dispatch, getState }) => {
		const { passenger } = getState().passengersManagement;

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

		const getFormDateFJ = jsonToFormData(passengerData);

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_PASSENGER}${passenger.id}`, getFormDateFJ, authTOKEN);
		return response;
	}
);

export const savePassenger = createAsyncThunk('passengerManagement/passenger/savePassenger', async passengerData => {
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

	const getFormDateFJ = jsonToFormData(passengerData);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_PASSENGER}`, getFormDateFJ, authTOKEN);
	return response;
});

const passengerSlice = createSlice({
	name: 'passengerManagement/passenger',
	initialState: null,
	reducers: {
		resetPassenger: () => null,
		newPassenger: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					religion: 'Muslim',
					passport_type: 'Ordinary'
				}
			})
		}
	},
	extraReducers: {
		[getPassenger.fulfilled]: (state, action) => action.payload,
		[savePassenger.fulfilled]: (state, action) => action.payload,
		[removePassenger.fulfilled]: (state, action) => action.payload,
		[updatePassenger.fulfilled]: (state, action) => action.payloHea
	}
});

export const { newPassenger, resetPassenger } = passengerSlice.actions;

export default passengerSlice.reducer;
