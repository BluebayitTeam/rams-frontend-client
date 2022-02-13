import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PAYMENT_SUMMARY_FILTER_BY, PAYMENT_SUMMARY_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getPaymentSummarys = createAsyncThunk(
	'paymentSummarysReportManagement/getPaymentSummarys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PAYMENT_SUMMARY_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${
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

export const getAllPaymentSummarys = createAsyncThunk(
	'paymentSummarysReportManagement/getAllPaymentSummarys',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PAYMENT_SUMMARY_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
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

const paymentSummaryReportsSlice = createSlice({
	name: 'paymentSummarysReportManagement/paymentSummarys',
	initialState: {
		paymentSummarys: []
	},
	extraReducers: {
		[getPaymentSummarys.fulfilled]: (state, action) => {
			state.paymentSummarys = action.payload?.paymentSummarys || [];
		},
		[getPaymentSummarys.rejected]: state => {
			state.paymentSummarys = [];
		},
		[getAllPaymentSummarys.fulfilled]: (state, action) => {
			state.paymentSummarys = action.payload?.paymentSummarys || [];
		},
		[getAllPaymentSummarys.rejected]: state => {
			state.paymentSummarys = [];
		}
	}
});

export default paymentSummaryReportsSlice.reducer;
