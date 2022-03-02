import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_LEDGER_MULTIPLE, GET_LEDGERS } from '../../../../../constant/constants';

export const getLedgers = createAsyncThunk('ledgerManagement/ledgers/getLedgers', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const response = axios.get(GET_LEDGERS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_ledgers_elements', data.data.total_elements);
	sessionStorage.setItem('total_ledgers_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.ledger_accounts;
});

export const removeLedgers = createAsyncThunk('ledgerManagement/ledgers/removeLedgers', async ledgerIds => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: localStorage.getItem('jwt_access_token')
	};
	const data = {
		ids: ledgerIds
	};
	const response = await axios.delete(`${DELETE_LEDGER_MULTIPLE}`, { headers, data });

	console.log('delteMultipleLedgerRes', response);
	return response;
});

const ledgersAdapter = createEntityAdapter({});

export const { selectAll: selectLedgers, selectById: selectLedgerById } = ledgersAdapter.getSelectors(
	state => state.ledgersManagement.ledgers
);

const ledgersSlice = createSlice({
	name: 'ledgerManagement/ledgers',
	initialState: ledgersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setLedgersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getLedgers.fulfilled]: ledgersAdapter.setAll
	}
});

export const { setData, setLedgersSearchText } = ledgersSlice.actions;
export default ledgersSlice.reducer;
