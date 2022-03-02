import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ledgerCashId } from 'app/@data/data';
import jsonToFormData from 'app/@helpers/jsonToFormData';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_RECEIPTVOUCHER,
	DELETE_RECEIPTVOUCHER,
	GET_RECEIPT_VOUCHER_BY_INVOICE_NO,
	UPDATE_RECEIPTVOUCHER
} from '../../../../../constant/constants';

export const getReceiptVoucher = createAsyncThunk(
	'receiptVoucherManagement/receiptVoucher/getReceiptVoucher',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_RECEIPT_VOUCHER_BY_INVOICE_NO}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeReceiptVoucher = createAsyncThunk(
	'receiptVoucherManagement/receiptVoucher/removeReceiptVoucher',
	async receiptVoucherId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const response = await axios.delete(`${DELETE_RECEIPTVOUCHER}${receiptVoucherId}`, authTOKEN);
		return response;
	}
);

export const updateReceiptVoucher = createAsyncThunk(
	'receiptVoucherManagement/receiptVoucher/updateReceiptVoucher',
	async receiptVoucherData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(receiptVoucherData);
		const response = await axios.put(`${UPDATE_RECEIPTVOUCHER}`, formdata, authTOKEN);
		return response;
	}
);

export const saveReceiptVoucher = createAsyncThunk(
	'receiptVoucherManagement/receiptVoucher/saveReceiptVoucher',
	async receiptVoucherData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(receiptVoucherData);
		const response = await axios.post(`${CREATE_RECEIPTVOUCHER}`, formdata, authTOKEN);
		return response;
	}
);

export const setUserBasedBranch = createAsyncThunk(
	'receiptVoucherManagement/receiptVoucher/setUserBasedBranch',
	async userId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.get(`${BRANCH_BY_USER_ID}${userId}`, authTOKEN);
		return response.data || {};
	}
);

const receiptVoucherSlice = createSlice({
	name: 'receiptVoucherManagement/receiptVoucher',
	initialState: null,
	reducers: {
		resetReceiptVoucher: () => null,
		newReceiptVoucher: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					receipt_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [
						{ ledger: ledgerCashId, debit_amount: 0, credit_amount: 0 },
						{ ledger: null, debit_amount: 0, credit_amount: 0 }
					]
				}
			})
		}
	},
	extraReducers: {
		[getReceiptVoucher.fulfilled]: (_state, action) => action.payload,
		[saveReceiptVoucher.fulfilled]: (_state, action) => action.payload,
		[removeReceiptVoucher.fulfilled]: (_state, action) => action.payload,
		[updateReceiptVoucher.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newReceiptVoucher, resetReceiptVoucher } = receiptVoucherSlice.actions;

export default receiptVoucherSlice.reducer;
