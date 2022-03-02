import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ledgerCashId } from 'app/@data/data';
import jsonToFormData from 'app/@helpers/jsonToFormData';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_PAYMENTVOUCHER,
	DELETE_PAYMENTVOUCHER,
	GET_PAYMENT_VOUCHER_BY_INVOICE_NO,
	UPDATE_PAYMENTVOUCHER
} from '../../../../../constant/constants';

export const getPaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/getPaymentVoucher',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_PAYMENT_VOUCHER_BY_INVOICE_NO}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/removePaymentVoucher',
	async paymentVoucherId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const response = await axios.delete(`${DELETE_PAYMENTVOUCHER}${paymentVoucherId}`, authTOKEN);
		return response;
	}
);

export const updatePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/updatePaymentVoucher',
	async paymentVoucherData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(paymentVoucherData);
		const response = await axios.put(`${UPDATE_PAYMENTVOUCHER}`, formdata, authTOKEN);
		return response;
	}
);

export const savePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/savePaymentVoucher',
	async paymentVoucherData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(paymentVoucherData);
		const response = await axios.post(`${CREATE_PAYMENTVOUCHER}`, formdata, authTOKEN);
		return response;
	}
);

export const setUserBasedBranch = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/setUserBasedBranch',
	async userId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.get(`${BRANCH_BY_USER_ID}${userId}`, authTOKEN);
		return response.data || {};
	}
);

const paymentVoucherSlice = createSlice({
	name: 'paymentVoucherManagement/paymentVoucher',
	initialState: null,
	reducers: {
		resetPaymentVoucher: () => null,
		newPaymentVoucher: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					payment_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [
						{ ledger: ledgerCashId, debit_amount: 0, credit_amount: 0 },
						{ ledger: null, debit_amount: 0, credit_amount: 0 }
					]
				}
			})
		}
	},
	extraReducers: {
		[getPaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[savePaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[removePaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[updatePaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newPaymentVoucher, resetPaymentVoucher } = paymentVoucherSlice.actions;

export default paymentVoucherSlice.reducer;
