import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_DEMAND, DELETE_DEMAND, GET_DEMAND_BY_ID, UPDATE_DEMAND } from '../../../../constant/constants';

export const getDemand = createAsyncThunk('demandManagement/demand/getDemand', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_DEMAND_BY_ID}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeDemand = createAsyncThunk('demandManagement/demand/removeDemand', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const demandId = val.id;
	const response = await axios.delete(`${DELETE_DEMAND}${demandId}`, authTOKEN);
	return response;
});

export const updateDemand = createAsyncThunk(
	'demandManagement/demand/updateDemand',
	async (demandData, { dispatch, getState }) => {
		const { demand } = getState().demandsManagement;

		const datas = { ...demandData, image: demandData.image || '' };

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

		const getFormDateFJ = jsonToFormData(datas);

		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_DEMAND}${demand.id}`, getFormDateFJ, authTOKEN);
		return response;
	}
);

export const saveDemand = createAsyncThunk('demandManagement/demand/saveDemand', async demandData => {
	const datas = { ...demandData, image: demandData.image || '' };
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

	const getFormDateFJ = jsonToFormData(datas);

	const authTOKEN = {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_DEMAND}`, getFormDateFJ, authTOKEN);
	return response;
});

const demandSlice = createSlice({
	name: 'demandManagement/demand',
	initialState: null,
	reducers: {
		resetDemand: () => null,
		newDemand: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getDemand.fulfilled]: (state, action) => action.payload,
		[saveDemand.fulfilled]: (state, action) => action.payload,
		[removeDemand.fulfilled]: (state, action) => action.payload,
		[updateDemand.fulfilled]: (state, action) => action.payload
	}
});

export const { newDemand, resetDemand } = demandSlice.actions;

export default demandSlice.reducer;
