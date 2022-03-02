import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_PAYMENTVOUCHER_MULTIPLE, GET_PAYMENTVOUCHERS } from '../../../../../constant/constants';

export const getPaymentVouchers = createAsyncThunk(
	'paymentVoucherManagement/paymentVouchers/getPaymentVouchers',
	async pageAndSize => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

		const response = axios.get(GET_PAYMENTVOUCHERS, { params: pageAndSize });
		const data = await response;

		sessionStorage.setItem('total_paymentVouchers_elements', data.data.total_elements);
		sessionStorage.setItem('total_paymentVouchers_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.payment_vouchers;
	}
);

export const removePaymentVouchers = createAsyncThunk(
	'paymentVoucherManagement/paymentVouchers/removePaymentVouchers',
	async paymentVoucherIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: paymentVoucherIds
		};
		const response = await axios.delete(`${DELETE_PAYMENTVOUCHER_MULTIPLE}`, { headers, data });

		console.log('delteMultiplePaymentVoucherRes', response);
		return response;
	}
);

const paymentVouchersAdapter = createEntityAdapter({});

export const { selectAll: selectPaymentVouchers, selectById: selectPaymentVoucherById } =
	paymentVouchersAdapter.getSelectors(state => state.paymentVouchersManagement.paymentVouchers);

const paymentVouchersSlice = createSlice({
	name: 'paymentVoucherManagement/paymentVouchers',
	initialState: paymentVouchersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPaymentVouchersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPaymentVouchers.fulfilled]: paymentVouchersAdapter.setAll
	}
});

export const { setData, setPaymentVouchersSearchText } = paymentVouchersSlice.actions;
export default paymentVouchersSlice.reducer;
