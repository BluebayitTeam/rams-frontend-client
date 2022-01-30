import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_SUBLEDGER_MULTIPLE, GET_SUBLEDGERS } from '../../../../../constant/constants';

export const getSubLedgers = createAsyncThunk('subLedgerManagement/subLedgers/geSubLedgers', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const response = axios.get(GET_SUBLEDGERS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_subLedgers_elements', data.data.total_elements);
	sessionStorage.setItem('total_subLedgers_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.sub_ledgers;
});

export const removeSubLedgers = createAsyncThunk(
	'subLedgerManagement/subLedgers/removeSubLedgers',
	async subLedgerIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: subLedgerIds
		};
		const response = await axios.delete(`${DELETE_SUBLEDGER_MULTIPLE}`, { headers, data });

		console.log('delteMultipleSubLedgerRes', response);
		return response;
	}
);

const subLedgersAdapter = createEntityAdapter({});

export const { selectAll: selectSubLedgers, selectById: selectSubLedgerById } = subLedgersAdapter.getSelectors(
	state => state.subLedgersManagement.subLedgers
);

const subLedgersSlice = createSlice({
	name: 'subLedgerManagement/subLedgers',
	initialState: subLedgersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSubLedgersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSubLedgers.fulfilled]: subLedgersAdapter.setAll
	}
});

export const { setData, setSubLedgersSearchText } = subLedgersSlice.actions;
export default subLedgersSlice.reducer;
