import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RECEIPT_SUMMARY_FILTER_BY, RECEIPT_SUMMARY_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getReceiptSummarys = createAsyncThunk(
	'receiptSummarysReportManagement/getReceiptSummarys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${RECEIPT_SUMMARY_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${
					values.sub_ledger || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`,
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

export const getAllReceiptSummarys = createAsyncThunk(
	'receiptSummarysReportManagement/getAllReceiptSummarys',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${RECEIPT_SUMMARY_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
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

const receiptSummaryReportsSlice = createSlice({
	name: 'receiptSummarysReportManagement/receiptSummarys',
	initialState: {
		receiptSummarys: []
	},
	extraReducers: {
		[getReceiptSummarys.fulfilled]: (state, action) => {
			state.receiptSummarys = action.payload?.receiptSummarys || [];
		},
		[getReceiptSummarys.rejected]: state => {
			state.receiptSummarys = [];
		},
		[getAllReceiptSummarys.fulfilled]: (state, action) => {
			state.receiptSummarys = action.payload?.receiptSummarys || [];
		},
		[getAllReceiptSummarys.rejected]: state => {
			state.receiptSummarys = [];
		}
	}
});

export default receiptSummaryReportsSlice.reducer;
