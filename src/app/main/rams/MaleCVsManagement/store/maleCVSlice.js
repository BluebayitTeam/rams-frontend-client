import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MALECV, DELETE_MALECV, UPDATE_MALECV } from '../../../../constant/constants';

export const removeMaleCV = createAsyncThunk('maleCVManagement/maleCV/removeMaleCV', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const maleCVId = val.id;
	const response = await axios.delete(`${DELETE_MALECV}${maleCVId}`, authTOKEN);
	return response;
});

export const updateMaleCV = createAsyncThunk('maleCVManagement/maleCV/updateMaleCV', async maleCVData => {
	const maleCVDatas = { ...maleCVData, created_by: '' };
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

	const getFormDateFJ = jsonToFormData(maleCVDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_MALECV}${maleCVData.id}`, getFormDateFJ, authTOKEN);
	return response;
});

export const saveMaleCV = createAsyncThunk('maleCVManagement/maleCV/saveMaleCV', async maleCVData => {
	const maleCVDatas = { ...maleCVData, updated_by: '' };
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

	const getFormDateFJ = jsonToFormData(maleCVDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_MALECV}`, getFormDateFJ, authTOKEN);
	return response;
});

const maleCVSlice = createSlice({
	name: 'maleCVManagement/maleCV',
	initialState: null,
	reducers: {
		resetMaleCV: () => null,
		newMaleCV: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveMaleCV.fulfilled]: (state, action) => action.payload,
		[removeMaleCV.fulfilled]: (state, action) => action.payload,
		[updateMaleCV.fulfilled]: (state, action) => action.payload
	}
});

export const { newMaleCV, resetMaleCV } = maleCVSlice.actions;

export default maleCVSlice.reducer;
