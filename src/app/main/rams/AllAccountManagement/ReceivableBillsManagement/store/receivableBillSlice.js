import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jsonToFormData from 'app/@helpers/jsonToFormData';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_RECEIVABLEBILL,
	DELETE_RECEIVABLEBILL,
	GET_RECEIVABLEBILL_BY_INVOICE_NO,
	UPDATE_RECEIVABLEBILL
} from '../../../../../constant/constants';

export const getReceivableBill = createAsyncThunk(
	'receivableBillManagement/receivableBill/getReceivableBill',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_RECEIVABLEBILL_BY_INVOICE_NO}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeReceivableBill = createAsyncThunk(
	'receivableBillManagement/receivableBill/removeReceivableBill',
	async receivableBillId => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const response = await axios.delete(`${DELETE_RECEIVABLEBILL}${receivableBillId}`, authTOKEN);
		return response;
	}
);

export const updateReceivableBill = createAsyncThunk(
	'receivableBillManagement/receivableBill/updateReceivableBill',
	async receivableBillData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(receivableBillData);
		const response = await axios.put(`${UPDATE_RECEIVABLEBILL}`, formdata, authTOKEN);
		return response;
	}
);

export const saveReceivableBill = createAsyncThunk(
	'receivableBillManagement/receivableBill/saveReceivableBill',
	async receivableBillData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const formdata = jsonToFormData(receivableBillData);
		const response = await axios.post(`${CREATE_RECEIVABLEBILL}`, formdata, authTOKEN);
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

const receivableBillSlice = createSlice({
	name: 'receivableBillManagement/receivableBill',
	initialState: null,
	reducers: {
		resetReceivableBill: () => null,
		newReceivableBill: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					sales_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [{ ledger: null, debit_amount: 0, credit_amount: 0 }]
				}
			})
		}
	},
	extraReducers: {
		[getReceivableBill.fulfilled]: (_state, action) => action.payload,
		[saveReceivableBill.fulfilled]: (_state, action) => action.payload,
		[removeReceivableBill.fulfilled]: (_state, action) => action.payload,
		[updateReceivableBill.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newReceivableBill, resetReceivableBill } = receivableBillSlice.actions;

export default receivableBillSlice.reducer;
