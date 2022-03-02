import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	BRANCH_BY_USER_ID,
	CREATE_CONTRA,
	DELETE_CONTRA,
	GET_CONTRA_BY_INVOICE_NO,
	UPDATE_CONTRA
} from '../../../../../constant/constants';

export const getContra = createAsyncThunk('contraManagement/contra/getContra', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_CONTRA_BY_INVOICE_NO}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeContra = createAsyncThunk('contraManagement/contra/removeContra', async contraId => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const response = await axios.delete(`${DELETE_CONTRA}${contraId}`, authTOKEN);
	return response;
});

export const updateContra = createAsyncThunk('contraManagement/contra/updateContra', async contraData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.put(`${UPDATE_CONTRA}`, contraData, authTOKEN);
	return response;
});

export const saveContra = createAsyncThunk('contraManagement/contra/saveContra', async contraData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_CONTRA}`, contraData, authTOKEN);
	return response;
});

export const setUserBasedBranch = createAsyncThunk('contraManagement/contra/setUserBasedBranch', async userId => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.get(`${BRANCH_BY_USER_ID}${userId}`, authTOKEN);
	return response.data || {};
});

const contraSlice = createSlice({
	name: 'contraManagement/contra',
	initialState: null,
	reducers: {
		resetContra: () => null,
		newContra: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					contra_date: moment(new Date()).format('YYYY-MM-DD'),
					items: [
						{ ledger: null, debit_amount: 0, credit_amount: 0 },
						{ ledger: null, debit_amount: 0, credit_amount: 0 }
					]
				}
			})
		}
	},
	extraReducers: {
		[getContra.fulfilled]: (_state, action) => action.payload,
		[saveContra.fulfilled]: (_state, action) => action.payload,
		[removeContra.fulfilled]: (_state, action) => action.payload,
		[updateContra.fulfilled]: (_state, action) => action.payload,
		[setUserBasedBranch.fulfilled]: (state, action) => {
			return {
				...state,
				branch: action.payload
			};
		}
	}
});

export const { newContra, resetContra } = contraSlice.actions;

export default contraSlice.reducer;
