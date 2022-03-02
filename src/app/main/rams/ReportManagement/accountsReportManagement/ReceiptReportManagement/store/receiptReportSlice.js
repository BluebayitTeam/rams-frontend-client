import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RECEIPT_FILTER_BY, RECEIPT_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getReceipts = createAsyncThunk(
	'receiptsReportManagement/getReceipts',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${RECEIPT_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${values.sub_ledger || ''}&date_after=${
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

export const getAllReceipts = createAsyncThunk(
	'receiptsReportManagement/getAllReceipts',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${RECEIPT_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
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

const receiptReportsSlice = createSlice({
	name: 'receiptsReportManagement/receipts',
	initialState: {
		receipts: []
	},
	extraReducers: {
		[getReceipts.fulfilled]: (state, action) => {
			state.receipts = action.payload?.receipts || [];
		},
		[getReceipts.rejected]: state => {
			state.receipts = [];
		},
		[getAllReceipts.fulfilled]: (state, action) => {
			state.receipts = action.payload?.receipts || [];
		},
		[getAllReceipts.rejected]: state => {
			state.receipts = [];
		}
	}
});

export default receiptReportsSlice.reducer;
