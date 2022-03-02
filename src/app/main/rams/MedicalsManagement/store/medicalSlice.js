import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MEDICAL, DELETE_MEDICAL, UPDATE_MEDICAL } from '../../../../constant/constants';

export const removeMedical = createAsyncThunk('medicalManagement/medical/removeMedical', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const medicalId = val.id;
	const response = await axios.delete(`${DELETE_MEDICAL}${medicalId}`, authTOKEN);
	return response;
});

export const updateMedical = createAsyncThunk('medicalManagement/medical/updateMedical', async medicalData => {
	const madicalDatas = { ...medicalData, created_by: '' };

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

	const getFormDateFJ = jsonToFormData(madicalDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_MEDICAL}${medicalData.id}`, getFormDateFJ, authTOKEN);
	return response;
});

export const saveMedical = createAsyncThunk('medicalManagement/medical/saveMedical', async medicalData => {
	const madicalDatas = { ...medicalData, updated_by: '' };

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

	const getFormDateFJ = jsonToFormData(madicalDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_MEDICAL}`, getFormDateFJ, authTOKEN);
	return response;
});

const medicalSlice = createSlice({
	name: 'medicalManagement/medical',
	initialState: null,
	reducers: {
		resetMedical: () => null,
		newMedical: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveMedical.fulfilled]: (state, action) => action.payload,
		[removeMedical.fulfilled]: (state, action) => action.payload,
		[updateMedical.fulfilled]: (state, action) => action.payload
	}
});

export const { newMedical, resetMedical } = medicalSlice.actions;

export default medicalSlice.reducer;
