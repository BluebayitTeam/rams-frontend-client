import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_MEDICALCENTER,
	DELETE_MEDICALCENTER,
	GET_MEDICALCENTER_BY_ID,
	UPDATE_MEDICALCENTER
} from '../../../../constant/constants';

export const getMedicalCenter = createAsyncThunk(
	'medicalCenterManagement/medicalCenter/getMedicalCenter',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MEDICALCENTER_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeMedicalCenter = createAsyncThunk(
	'medicalCenterManagement/medicalCenter/removeMedicalCenter',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const medicalCenterId = val.id;
		const response = await axios.delete(`${DELETE_MEDICALCENTER}${medicalCenterId}`, authTOKEN);
		return response;
	}
);

export const updateMedicalCenter = createAsyncThunk(
	'medicalCenterManagement/medicalCenter/updateMedicalCenter',
	async (medicalCenterData, { dispatch, getState }) => {
		const { medicalCenter } = getState().medicalCentersManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MEDICALCENTER}${medicalCenter.id}`, medicalCenterData, authTOKEN);
		return response;
	}
);

export const saveMedicalCenter = createAsyncThunk(
	'medicalCenterManagement/medicalCenter/saveMedicalCenter',
	async medicalCenterData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_MEDICALCENTER}`, medicalCenterData, authTOKEN);
		return response;
	}
);

const medicalCenterSlice = createSlice({
	name: 'medicalCenterManagement/medicalCenter',
	initialState: null,
	reducers: {
		resetMedicalCenter: () => null,
		newMedicalCenter: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getMedicalCenter.fulfilled]: (state, action) => action.payload,
		[saveMedicalCenter.fulfilled]: (state, action) => action.payload,
		[removeMedicalCenter.fulfilled]: (state, action) => action.payload,
		[updateMedicalCenter.fulfilled]: (state, action) => action.payload
	}
});

export const { newMedicalCenter, resetMedicalCenter } = medicalCenterSlice.actions;

export default medicalCenterSlice.reducer;
