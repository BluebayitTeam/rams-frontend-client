import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_LEDGER, DELETE_LEDGER, GET_LEDGER_BY_ID, UPDATE_LEDGER } from '../../../../../constant/constants';

export const getLedger = createAsyncThunk('ledgerManagement/ledger/getLedger', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_LEDGER_BY_ID}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeLedger = createAsyncThunk('ledgerManagement/ledger/removeLedger', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const ledgerId = val.id;
	const response = await axios.delete(`${DELETE_LEDGER}${ledgerId}`, authTOKEN);
	return response;
});

export const updateLedger = createAsyncThunk(
	'ledgerManagement/ledger/updateLedger',
	async (ledgerData, { dispatch, getState }) => {
		const { ledger } = getState().ledgersManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_LEDGER}${ledger.id}`, ledgerData, authTOKEN);
		return response;
	}
);

export const saveLedger = createAsyncThunk('ledgerManagement/ledger/saveLedger', async ledgerData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_LEDGER}`, ledgerData, authTOKEN);
	return response;
});

const ledgerSlice = createSlice({
	name: 'ledgerManagement/ledger',
	initialState: null,
	reducers: {
		resetLedger: () => null,
		newLedger: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getLedger.fulfilled]: (_state, action) => action.payload,
		[saveLedger.fulfilled]: (_state, action) => action.payload,
		[removeLedger.fulfilled]: (_state, action) => action.payload,
		[updateLedger.fulfilled]: (_state, action) => action.payloHea
	}
});

export const { newLedger, resetLedger } = ledgerSlice.actions;

export default ledgerSlice.reducer;
