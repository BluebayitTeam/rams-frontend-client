import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_PAYABLEBILL_MULTIPLE, GET_PAYABLEBILLS } from '../../../../../constant/constants';

export const getPayableBills = createAsyncThunk(
	'payableBillManagement/payableBills/getPayableBills',
	async pageAndSize => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const response = axios.get(GET_PAYABLEBILLS, { params: pageAndSize });
		const data = await response;

		sessionStorage.setItem('total_payableBills_elements', data.data.total_elements);
		sessionStorage.setItem('total_payableBills_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.purchases;
	}
);

export const removePayableBills = createAsyncThunk(
	'payableBillManagement/payableBills/removePayableBills',
	async payableBillIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: payableBillIds
		};
		const response = await axios.delete(`${DELETE_PAYABLEBILL_MULTIPLE}`, { headers, data });

		console.log('delteMultiplePayableBillRes', response);
		return response;
	}
);

const payableBillsAdapter = createEntityAdapter({});

export const { selectAll: selectPayableBills, selectById: selectPayableBillById } = payableBillsAdapter.getSelectors(
	state => state.payableBillsManagement.payableBills
);

const payableBillsSlice = createSlice({
	name: 'payableBillManagement/payableBills',
	initialState: payableBillsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPayableBillsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPayableBills.fulfilled]: payableBillsAdapter.setAll
	}
});

export const { setData, setPayableBillsSearchText } = payableBillsSlice.actions;
export default payableBillsSlice.reducer;
