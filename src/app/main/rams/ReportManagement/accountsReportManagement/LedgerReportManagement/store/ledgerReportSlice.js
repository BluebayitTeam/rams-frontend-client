import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LEDGER_FILTER_BY, LEDGER_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getLedgers = createAsyncThunk(
	'ledgersReportManagement/getLedgers',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${LEDGER_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${values.sub_ledger || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}`,
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

export const getAllLedgers = createAsyncThunk(
	'ledgersReportManagement/getAllLedgers',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${LEDGER_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
					values.sub_ledger || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const ledgerReportsSlice = createSlice({
	name: 'ledgersReportManagement/ledgers',
	initialState: {
		ledgers: []
	},
	extraReducers: {
		[getLedgers.fulfilled]: (state, action) => {
			state.ledgers = action.payload?.ledgers || [];
		},
		[getLedgers.rejected]: state => {
			state.ledgers = [];
		},
		[getAllLedgers.fulfilled]: (state, action) => {
			state.ledgers = action.payload?.ledgers || [];
		},
		[getAllLedgers.rejected]: state => {
			state.ledgers = [];
		}
	}
});

export default ledgerReportsSlice.reducer;
