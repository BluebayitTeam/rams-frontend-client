import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCOUNTSTATEMENT_FILTER_BY, ACCOUNTSTATEMENT_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getAccountStatements = createAsyncThunk(
	'accountStatementsReportManagement/getAccountStatements',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${ACCOUNTSTATEMENT_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${
					values.sub_ledger || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}${
					values.account_type ? `&account_type=${values.account_type}` : ''
				}`,
				{ params: pageAndSize }
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

export const getAllAccountStatements = createAsyncThunk(
	'accountStatementsReportManagement/getAllAccountStatements',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${ACCOUNTSTATEMENT_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
					values.sub_ledger || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}${
					values.account_type ? `&account_type=${values.account_type}` : ''
				}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const accountStatementReportsSlice = createSlice({
	name: 'accountStatementsReportManagement/accountStatements',
	initialState: {
		accountStatements: []
	},
	extraReducers: {
		[getAccountStatements.fulfilled]: (state, action) => {
			state.accountStatements = action.payload?.accountStatements || [];
		},
		[getAccountStatements.rejected]: state => {
			state.accountStatements = [];
		},
		[getAllAccountStatements.fulfilled]: (state, action) => {
			state.accountStatements = action.payload?.accountStatements || [];
		},
		[getAllAccountStatements.rejected]: state => {
			state.accountStatements = [];
		}
	}
});

export default accountStatementReportsSlice.reducer;
