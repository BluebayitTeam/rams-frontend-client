import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_JOURNAL,
	DELETE_JOURNAL,
	GET_JOURNAL_BY_INVOICE_NO,
	UPDATE_JOURNAL
} from '../../../../../constant/constants';

export const getJournal = createAsyncThunk(
	'journalManagement/journal/getJournal',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_JOURNAL_BY_INVOICE_NO}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeJournal = createAsyncThunk('journalManagement/journal/removeJournal', async journalId => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const response = await axios.delete(`${DELETE_JOURNAL}${journalId}`, authTOKEN);
	return response;
});

export const updateJournal = createAsyncThunk('journalManagement/journal/updateJournal', async journalData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_JOURNAL}`, journalData, authTOKEN);
	return response;
});

export const saveJournal = createAsyncThunk('journalManagement/journal/saveJournal', async journalData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_JOURNAL}`, journalData, authTOKEN);
	return response;
});

export const setUserBasedBranch = createAsyncThunk('journalManagement/journal/setUserBasedBranch', async userId => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.get(`${BRANCH_BY_USER_ID}${userId}`, authTOKEN);
	return response.data || {};
});

const journalSlice = createSlice({
	name: 'journalManagement/journal',
	initialState: null,
	reducers: {
		resetJournal: () => null,
		newJournal: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					journal_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [
						{ ledger: null, debit_amount: 0, credit_amount: 0 },
						{ ledger: null, debit_amount: 0, credit_amount: 0 }
					]
				}
			})
		}
	},
	extraReducers: {
		[getJournal.fulfilled]: (_state, action) => action.payload,
		[saveJournal.fulfilled]: (_state, action) => action.payload,
		[removeJournal.fulfilled]: (_state, action) => action.payload,
		[updateJournal.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newJournal, resetJournal } = journalSlice.actions;

export default journalSlice.reducer;
