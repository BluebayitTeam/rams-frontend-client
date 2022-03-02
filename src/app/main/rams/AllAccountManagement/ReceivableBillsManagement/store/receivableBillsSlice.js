import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_RECEIVABLEBILL_MULTIPLE, GET_RECEIVABLEBILLS } from '../../../../../constant/constants';

export const getReceivableBills = createAsyncThunk(
	'receivableBillManagement/receivableBills/getReceivableBills',
	async pageAndSize => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const response = axios.get(GET_RECEIVABLEBILLS, { params: pageAndSize });
		const data = await response;

		sessionStorage.setItem('total_receivableBills_elements', data.data.total_elements);
		sessionStorage.setItem('total_receivableBills_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.sales;
	}
);

export const removeReceivableBills = createAsyncThunk(
	'receivableBillManagement/receivableBills/removeReceivableBills',
	async receivableBillIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: receivableBillIds
		};
		const response = await axios.delete(`${DELETE_RECEIVABLEBILL_MULTIPLE}`, { headers, data });

		console.log('delteMultipleReceivableBillRes', response);
		return response;
	}
);

const receivableBillsAdapter = createEntityAdapter({});

export const { selectAll: selectReceivableBills, selectById: selectReceivableBillById } =
	receivableBillsAdapter.getSelectors(state => state.receivableBillsManagement.receivableBills);

const receivableBillsSlice = createSlice({
	name: 'receivableBillManagement/receivableBills',
	initialState: receivableBillsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setReceivableBillsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getReceivableBills.fulfilled]: receivableBillsAdapter.setAll
	}
});

export const { setData, setReceivableBillsSearchText } = receivableBillsSlice.actions;
export default receivableBillsSlice.reducer;
