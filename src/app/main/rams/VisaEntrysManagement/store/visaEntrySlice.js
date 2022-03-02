import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_VISAENTRY,
	DELETE_VISAENTRY,
	GET_VISAENTRY_BY_ID,
	UPDATE_VISAENTRY
} from '../../../../constant/constants';

export const getVisaEntry = createAsyncThunk(
	'visaEntryManagement/visaEntry/getVisaEntry',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_VISAENTRY_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeVisaEntry = createAsyncThunk('visaEntryManagement/visaEntry/removeVisaEntry', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const visaEntryId = val.id;
	const response = await axios.delete(`${DELETE_VISAENTRY}${visaEntryId}`, authTOKEN);
	return response;
});

export const updateVisaEntry = createAsyncThunk(
	'visaEntryManagement/visaEntry/updateVisaEntry',
	async (visaEntryData, { dispatch, getState }) => {
		const { visaEntry } = getState().visaEntrysManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_VISAENTRY}${visaEntry.id}`, visaEntryData, authTOKEN);
		return response;
	}
);

export const saveVisaEntry = createAsyncThunk('visaEntryManagement/visaEntry/saveVisaEntry', async visaEntryData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_VISAENTRY}`, visaEntryData, authTOKEN);
	return response;
});

const visaEntrySlice = createSlice({
	name: 'visaEntryManagement/visaEntry',
	initialState: null,
	reducers: {
		resetVisaEntry: () => null,
		newVisaEntry: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getVisaEntry.fulfilled]: (state, action) => action.payload,
		[saveVisaEntry.fulfilled]: (state, action) => action.payload,
		[removeVisaEntry.fulfilled]: (state, action) => action.payload,
		[updateVisaEntry.fulfilled]: (state, action) => action.payload
	}
});

export const { newVisaEntry, resetVisaEntry } = visaEntrySlice.actions;

export default visaEntrySlice.reducer;
