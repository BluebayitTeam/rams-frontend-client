import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_RECEIPTVOUCHER_MULTIPLE, GET_RECEIPTVOUCHERS } from '../../../../../constant/constants';

export const getReceiptVouchers = createAsyncThunk(
	'receiptVoucherManagement/receiptVouchers/getReceiptVouchers',
	async pageAndSize => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const response = axios.get(GET_RECEIPTVOUCHERS, { params: pageAndSize });
		const data = await response;

		sessionStorage.setItem('total_receiptVouchers_elements', data.data.total_elements);
		sessionStorage.setItem('total_receiptVouchers_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.receipt_vouchers;
	}
);

export const removeReceiptVouchers = createAsyncThunk(
	'receiptVoucherManagement/receiptVouchers/removeReceiptVouchers',
	async receiptVoucherIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: receiptVoucherIds
		};
		const response = await axios.delete(`${DELETE_RECEIPTVOUCHER_MULTIPLE}`, { headers, data });

		console.log('delteMultipleReceiptVoucherRes', response);
		return response;
	}
);

const receiptVouchersAdapter = createEntityAdapter({});

export const { selectAll: selectReceiptVouchers, selectById: selectReceiptVoucherById } =
	receiptVouchersAdapter.getSelectors(state => state.receiptVouchersManagement.receiptVouchers);

const receiptVouchersSlice = createSlice({
	name: 'receiptVoucherManagement/receiptVouchers',
	initialState: receiptVouchersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setReceiptVouchersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getReceiptVouchers.fulfilled]: receiptVouchersAdapter.setAll
	}
});

export const { setData, setReceiptVouchersSearchText } = receiptVouchersSlice.actions;
export default receiptVouchersSlice.reducer;
