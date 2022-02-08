import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_PAYABLEBILL,
	DELETE_PAYABLEBILL,
	GET_PAYABLEBILL_BY_INVOICE_NO,
	UPDATE_PAYABLEBILL
} from '../../../../../constant/constants';

export const getPayableBill = createAsyncThunk(
	'payableBillManagement/payableBill/getPayableBill',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_PAYABLEBILL_BY_INVOICE_NO}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removePayableBill = createAsyncThunk(
	'payableBillManagement/payableBill/removePayableBill',
	async payableBillId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const response = await axios.delete(`${DELETE_PAYABLEBILL}${payableBillId}`, authTOKEN);
		return response;
	}
);

export const updatePayableBill = createAsyncThunk(
	'payableBillManagement/payableBill/updatePayableBill',
	async payableBillData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_PAYABLEBILL}`, payableBillData, authTOKEN);
		return response;
	}
);

export const savePayableBill = createAsyncThunk(
	'payableBillManagement/payableBill/savePayableBill',
	async payableBillData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_PAYABLEBILL}`, payableBillData, authTOKEN);
		return response;
	}
);

export const setUserBasedBranch = createAsyncThunk(
	'paymentvoucherManagement/paymentvoucher/setUserBasedBranch',
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

const payableBillSlice = createSlice({
	name: 'payableBillManagement/payableBill',
	initialState: null,
	reducers: {
		resetPayableBill: () => null,
		newPayableBill: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					purchase_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [{ ledger: null, debit_amount: 0, credit_amount: 0 }]
				}
			})
		}
	},
	extraReducers: {
		[getPayableBill.fulfilled]: (_state, action) => action.payload,
		[savePayableBill.fulfilled]: (_state, action) => action.payload,
		[removePayableBill.fulfilled]: (_state, action) => action.payload,
		[updatePayableBill.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newPayableBill, resetPayableBill } = payableBillSlice.actions;

export default payableBillSlice.reducer;
