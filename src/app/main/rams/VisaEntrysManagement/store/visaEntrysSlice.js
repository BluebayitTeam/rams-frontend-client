import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_VISAENTRY_MULTIPLE, GET_VISAENTRYS } from '../../../../constant/constants';

export const getVisaEntrys = createAsyncThunk('visaEntryManagement/visaEntrys/getVisaEntrys', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_VISAENTRYS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_visaEntrys_elements', data.data.total_elements);
	sessionStorage.setItem('total_visaEntrys_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	console.log('listData', data);

	return data.data.visa_entries;
});

export const removeVisaEntrys = createAsyncThunk(
	'visaEntryManagement/visaEntrys/removeVisaEntrys',
	async visaEntryIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: visaEntryIds
		};

		const response = await axios.delete(`${DELETE_VISAENTRY_MULTIPLE}`, { headers, data });

		console.log('multiple_delete', response);

		return response;
	}
);

const visaEntrysAdapter = createEntityAdapter({});

export const { selectAll: selectVisaEntrys, selectById: selectVisaEntryById } = visaEntrysAdapter.getSelectors(
	state => state.visaEntrysManagement.visaEntrys
);

const visaEntrysSlice = createSlice({
	name: 'visaEntryManagement/visaEntrys',
	initialState: visaEntrysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setVisaEntrysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getVisaEntrys.fulfilled]: visaEntrysAdapter.setAll
	}
});

export const { setData, setVisaEntrysSearchText } = visaEntrysSlice.actions;
export default visaEntrysSlice.reducer;
