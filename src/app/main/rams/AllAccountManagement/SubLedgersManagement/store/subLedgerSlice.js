import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_SUBLEDGER,
	DELETE_SUBLEDGER,
	GET_SUBLEDGER_BY_ID,
	UPDATE_SUBLEDGER
} from '../../../../../constant/constants';

export const getSubLedger = createAsyncThunk(
	'subLedgerManagement/subLedger/getSubLedger',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_SUBLEDGER_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeSubLedger = createAsyncThunk('subLedgerManagement/subLedger/removeSubLedger', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const subLedgerId = val.id;
	const response = await axios.delete(`${DELETE_SUBLEDGER}${subLedgerId}`, authTOKEN);
	return response;
});

export const updateSubLedger = createAsyncThunk(
	'subLedgerManagement/subLedger/updateSubLedger',
	async (subLedgerData, { dispatch, getState }) => {
		const { subLedger } = getState().subLedgersManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_SUBLEDGER}${subLedger.id}`, subLedgerData, authTOKEN);
		return response;
	}
);

export const saveSubLedger = createAsyncThunk('subLedgerManagement/subLedger/saveSubLedger', async subLedgerData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_SUBLEDGER}`, subLedgerData, authTOKEN);
	return response;
});

const subLedgerSlice = createSlice({
	name: 'subLedgerManagement/subLedger',
	initialState: null,
	reducers: {
		resetSubLedger: () => null,
		newSubLedger: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getSubLedger.fulfilled]: (_state, action) => action.payload,
		[saveSubLedger.fulfilled]: (_state, action) => action.payload,
		[removeSubLedger.fulfilled]: (_state, action) => action.payload,
		[updateSubLedger.fulfilled]: (_state, action) => action.payload
	}
});

export const { newSubLedger, resetSubLedger } = subLedgerSlice.actions;

export default subLedgerSlice.reducer;
