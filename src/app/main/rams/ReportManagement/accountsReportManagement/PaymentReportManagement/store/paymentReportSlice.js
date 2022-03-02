import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PAYMENT_FILTER_BY, PAYMENT_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getPayments = createAsyncThunk(
	'paymentsReportManagement/getPayments',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PAYMENT_FILTER_BY}?ledger=${values.ledger || ''}&sub_ledger=${values.sub_ledger || ''}&date_after=${
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

export const getAllPayments = createAsyncThunk(
	'paymentsReportManagement/getAllPayments',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PAYMENT_FILTER_WITHOUT_PG}?ledger=${values.ledger || ''}&sub_ledger=${
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

const paymentReportsSlice = createSlice({
	name: 'paymentsReportManagement/payments',
	initialState: {
		payments: []
	},
	extraReducers: {
		[getPayments.fulfilled]: (state, action) => {
			state.payments = action.payload?.payments || [];
		},
		[getPayments.rejected]: state => {
			state.payments = [];
		},
		[getAllPayments.fulfilled]: (state, action) => {
			state.payments = action.payload?.payments || [];
		},
		[getAllPayments.rejected]: state => {
			state.payments = [];
		}
	}
});

export default paymentReportsSlice.reducer;
