import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_PASSENGERTYPE,
	DELETE_PASSENGERTYPE,
	GET_PASSENGERTYPE_BY_ID,
	UPDATE_PASSENGERTYPE
} from '../../../../constant/constants';

export const getPassengerType = createAsyncThunk(
	'passengerTypeManagement/passengerType/getPassengerType',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_PASSENGERTYPE_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removePassengerType = createAsyncThunk(
	'passengerTypeManagement/passengerType/removePassengerType',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const passengerTypeId = val.id;
		const response = await axios.delete(`${DELETE_PASSENGERTYPE}${passengerTypeId}`, authTOKEN);
		return response;
	}
);

export const updatePassengerType = createAsyncThunk(
	'passengerTypeManagement/passengerType/updatePassengerType',
	async (passengerTypeData, { dispatch, getState }) => {
		const { passengerType } = getState().passengerTypesManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_PASSENGERTYPE}${passengerType.id}`, passengerTypeData, authTOKEN);
		return response;
	}
);

export const savePassengerType = createAsyncThunk(
	'passengerTypeManagement/passengerType/savePassengerType',
	async passengerTypeData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_PASSENGERTYPE}`, passengerTypeData, authTOKEN);
		return response;
	}
);

const passengerTypeSlice = createSlice({
	name: 'passengerTypeManagement/passengerType',
	initialState: null,
	reducers: {
		resetPassengerType: () => null,
		newPassengerType: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getPassengerType.fulfilled]: (state, action) => action.payload,
		[savePassengerType.fulfilled]: (state, action) => action.payload,
		[removePassengerType.fulfilled]: (state, action) => action.payload,
		[updatePassengerType.fulfilled]: (state, action) => action.payload
	}
});

export const { newPassengerType, resetPassengerType } = passengerTypeSlice.actions;

export default passengerTypeSlice.reducer;
