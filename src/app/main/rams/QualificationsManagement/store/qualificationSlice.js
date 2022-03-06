import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_QUALIFICATION,
	DELETE_QUALIFICATION,
	GET_QUALIFICATIONID,
	UPDATE_QUALIFICATION
} from '../../../../constant/constants';

export const getQualification = createAsyncThunk(
	'qualificationManagement/qualification/getQualification',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_QUALIFICATIONID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeQualification = createAsyncThunk(
	'qualificationManagement/qualification/removeQualification',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const qualificationId = val.id;
		const response = await axios.delete(`${DELETE_QUALIFICATION}${qualificationId}`, authTOKEN);
		return response;
	}
);

export const updateQualification = createAsyncThunk(
	'qualificationManagement/qualification/updateQualification',
	async (qualificationData, { dispatch, getState }) => {
		const { qualification } = getState().qualificationsManagement;

		function buildFormData(formData, data, parentKey) {
			if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
				Object.keys(data).forEach(key => {
					buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
				});
			} else {
				const value = data === null ? '' : data;

				formData.append(parentKey, value);
			}
		}

		function jsonToFormData(data) {
			const formData = new FormData();

			buildFormData(formData, data);

			return formData;
		}

		const qualificationDataToFormData = jsonToFormData({
			...qualificationData,
			image_doc_one: qualificationData.image_doc_one || '',
			image_doc_two: qualificationData.image_doc_two || '',
			image_doc_three: qualificationData.image_doc_three || '',
			image_doc_four: qualificationData.image_doc_four || ''
		});

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(
			`${UPDATE_QUALIFICATION}${qualification.id}`,
			qualificationDataToFormData,
			authTOKEN
		);
		return response;
	}
);

export const saveQualification = createAsyncThunk(
	'qualificationManagement/qualification/saveQualification',
	async qualificationData => {
		function buildFormData(formData, data, parentKey) {
			if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
				Object.keys(data).forEach(key => {
					buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
				});
			} else {
				const value = data === null ? '' : data;

				formData.append(parentKey, value);
			}
		}

		function jsonToFormData(data) {
			const formData = new FormData();

			buildFormData(formData, data);

			return formData;
		}

		const getFormDateFJ = jsonToFormData({
			...qualificationData,
			image_doc_one: qualificationData.image_doc_one || '',
			image_doc_two: qualificationData.image_doc_two || '',
			image_doc_three: qualificationData.image_doc_three || '',
			image_doc_four: qualificationData.image_doc_four || ''
		});

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_QUALIFICATION}`, getFormDateFJ, authTOKEN);
		return response;
	}
);

const qualificationSlice = createSlice({
	name: 'qualificationManagement/qualification',
	initialState: null,
	reducers: {
		resetQualification: () => null,
		newQualification: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getQualification.fulfilled]: (state, action) => action.payload,
		[saveQualification.fulfilled]: (state, action) => action.payload,
		[removeQualification.fulfilled]: (state, action) => action.payload,
		[updateQualification.fulfilled]: (state, action) => action.payload
	}
});

export const { newQualification, resetQualification } = qualificationSlice.actions;

export default qualificationSlice.reducer;
