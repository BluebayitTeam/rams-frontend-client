import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_PAYMENTVOUCHER,
	DELETE_PAYMENTVOUCHER,
	GET_PAYMENTVOUCHER_BY_ID,
	UPDATE_PAYMENTVOUCHER
} from '../../../../constant/constants';

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
			const response = await axios.get(`${GET_PAYMENTVOUCHER_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/removePaymentVoucher',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const paymentVoucherId = val.id;
		const response = await axios.delete(`${DELETE_PAYMENTVOUCHER}${paymentVoucherId}`, authTOKEN);
		return response;
	}
);

export const updatePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/updatePaymentVoucher',
	async (paymentVoucherData, { dispatch, getState }) => {
		const { paymentVoucher } = getState().paymentVouchersManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_PAYMENTVOUCHER}${paymentVoucher.id}`, paymentVoucherData, authTOKEN);
		return response;
	}
);

export const savePaymentVoucher = createAsyncThunk(
	'paymentVoucherManagement/paymentVoucher/savePaymentVoucher',
	async paymentVoucherData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_PAYMENTVOUCHER}`, paymentVoucherData, authTOKEN);
		return response;
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
				payload: {}
			})
		}
	},
	extraReducers: {
		[getPaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[savePaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[removePaymentVoucher.fulfilled]: (_state, action) => action.payload,
		[updatePaymentVoucher.fulfilled]: (_state, action) => action.payloHea
	}
});

export const { newPaymentVoucher, resetPaymentVoucher } = paymentVoucherSlice.actions;

export default paymentVoucherSlice.reducer;
