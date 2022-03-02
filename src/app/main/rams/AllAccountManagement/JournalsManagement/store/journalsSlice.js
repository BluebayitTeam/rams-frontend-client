import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_JOURNAL_MULTIPLE, GET_JOURNALS } from '../../../../../constant/constants';

export const getJournals = createAsyncThunk('journalManagement/journals/getJournals', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_JOURNALS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_journals_elements', data.data.total_elements);
	sessionStorage.setItem('total_journals_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.journals;
});

export const removeJournals = createAsyncThunk('journalManagement/journals/removeJournals', async journalIds => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: sessionStorage.getItem('jwt_access_token')
	};
	const data = {
		ids: journalIds
	};
	const response = await axios.delete(`${DELETE_JOURNAL_MULTIPLE}`, { headers, data });

	console.log('delteMultipleJournalRes', response);
	return response;
});

const journalsAdapter = createEntityAdapter({});

export const { selectAll: selectJournals, selectById: selectJournalById } = journalsAdapter.getSelectors(
	state => state.journalsManagement.journals
);

const journalsSlice = createSlice({
	name: 'journalManagement/journals',
	initialState: journalsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setJournalsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getJournals.fulfilled]: journalsAdapter.setAll
	}
});

export const { setData, setJournalsSearchText } = journalsSlice.actions;
export default journalsSlice.reducer;
