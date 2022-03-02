import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_EMBASSY, DELETE_EMBASSY, UPDATE_EMBASSY } from '../../../../constant/constants';

export const removeEmbassy = createAsyncThunk('embassyManagement/embassy/removeEmbassy', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const embassyId = val.id;
	const response = await axios.delete(`${DELETE_EMBASSY}${embassyId}`, authTOKEN);
	return response;
});

export const updateEmbassy = createAsyncThunk('embassyManagement/embassy/updateEmbassy', async embassyData => {
	const embassyDatas = { ...embassyData, created_by: '', updated_by: '' };
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

	const getFormDateFJ = jsonToFormData(embassyDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_EMBASSY}${embassyData.id}`, getFormDateFJ, authTOKEN);
	return response;
});

export const saveEmbassy = createAsyncThunk('embassyManagement/embassy/saveEmbassy', async embassyData => {
	const embassyDatas = { ...embassyData, updated_by: '', created_by: '' };
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

	const getFormDateFJ = jsonToFormData(embassyDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_EMBASSY}`, getFormDateFJ, authTOKEN);
	return response;
});

const embassySlice = createSlice({
	name: 'embassyManagement/embassy',
	initialState: null,
	reducers: {
		resetEmbassy: () => null,
		newEmbassy: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveEmbassy.fulfilled]: (state, action) => action.payload,
		[removeEmbassy.fulfilled]: (state, action) => action.payload,
		[updateEmbassy.fulfilled]: (state, action) => action.payload
	}
});

export const { newEmbassy, resetEmbassy } = embassySlice.actions;

export default embassySlice.reducer;
