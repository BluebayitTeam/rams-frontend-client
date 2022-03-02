import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_TRAINING, DELETE_TRAINING, UPDATE_TRAINING } from '../../../../constant/constants';

export const removeTraining = createAsyncThunk('trainingManagement/training/removeTraining', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const trainingId = val.id;
	const response = await axios.delete(`${DELETE_TRAINING}${trainingId}`, authTOKEN);
	return response;
});

export const updateTraining = createAsyncThunk('trainingManagement/training/updateTraining', async trainingData => {
	const trainingDatas = { ...trainingData, created_by: '', updated_by: '' };
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

	const getFormDateFJ = jsonToFormData(trainingDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_TRAINING}${trainingData.id}`, getFormDateFJ, authTOKEN);
	return response;
});

export const saveTraining = createAsyncThunk('trainingManagement/training/saveTraining', async trainingData => {
	const trainingDatas = { ...trainingData, updated_by: '', created_by: '' };
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

	const getFormDateFJ = jsonToFormData(trainingDatas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_TRAINING}`, getFormDateFJ, authTOKEN);
	return response;
});

const trainingSlice = createSlice({
	name: 'trainingManagement/training',
	initialState: null,
	reducers: {
		resetTraining: () => null,
		newTraining: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveTraining.fulfilled]: (state, action) => action.payload,
		[removeTraining.fulfilled]: (state, action) => action.payload,
		[updateTraining.fulfilled]: (state, action) => action.payload
	}
});

export const { newTraining, resetTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
