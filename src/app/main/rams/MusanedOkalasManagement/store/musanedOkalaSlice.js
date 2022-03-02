import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MUSANEDOKALA, DELETE_MUSANEDOKALA, UPDATE_MUSANEDOKALA } from '../../../../constant/constants';

export const removeMusanedOkala = createAsyncThunk(
	'musanedOkalaManagement/musanedOkala/removeMusanedOkala',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const musanedOkalaId = val.id;
		const response = await axios.delete(`${DELETE_MUSANEDOKALA}${musanedOkalaId}`, authTOKEN);
		return response;
	}
);

export const updateMusanedOkala = createAsyncThunk(
	'musanedOkalaManagement/musanedOkala/updateMusanedOkala',
	async musanedOkalaData => {
		const musanedOkalaDatas = { ...musanedOkalaData, created_by: '' };
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

		const getFormDateFJ = jsonToFormData(musanedOkalaDatas);

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MUSANEDOKALA}${musanedOkalaData.id}`, getFormDateFJ, authTOKEN);
		return response;
	}
);

export const saveMusanedOkala = createAsyncThunk(
	'musanedOkalaManagement/musanedOkala/saveMusanedOkala',
	async musanedOkalaData => {
		const musanedOkalaDatas = { ...musanedOkalaData, updated_by: '' };
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

		const getFormDateFJ = jsonToFormData(musanedOkalaDatas);

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_MUSANEDOKALA}`, getFormDateFJ, authTOKEN);
		return response;
	}
);

const musanedOkalaSlice = createSlice({
	name: 'musanedOkalaManagement/musanedOkala',
	initialState: null,
	reducers: {
		resetMusanedOkala: () => null,
		newMusanedOkala: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveMusanedOkala.fulfilled]: (state, action) => action.payload,
		[removeMusanedOkala.fulfilled]: (state, action) => action.payload,
		[updateMusanedOkala.fulfilled]: (state, action) => action.payload
	}
});

export const { newMusanedOkala, resetMusanedOkala } = musanedOkalaSlice.actions;

export default musanedOkalaSlice.reducer;
