import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_MAKEALIST_MULTIPLE, GET_MAKEALISTS } from '../../../../../constant/constants';

export const getMakeALists = createAsyncThunk('makeAListsManagement/makeALists/getMakeALists', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_MAKEALISTS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_makeALists_elements', data.data.total_elements);
	sessionStorage.setItem('total_makeALists_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.make_lists;
});

export const removeMakeALists = createAsyncThunk(
	'makeAListsManagement/makeALists/removeMakeALists',
	async makeAListIds => {
		const headers = {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		};
		const data = {
			ids: makeAListIds
		};
		const response = await axios.delete(`${DELETE_MAKEALIST_MULTIPLE}`, { headers, data });

		console.log('delteMultipleMakeAListRes', response);
		return response;
	}
);

const makeAListsAdapter = createEntityAdapter({});

export const { selectAll: selectMakeALists, selectById: selectMakeAListById } = makeAListsAdapter.getSelectors(
	state => state.makeAListsManagement.makeALists
);

const makeAListsSlice = createSlice({
	name: 'makeAListsManagement/makeALists',
	initialState: makeAListsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMakeAListsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMakeALists.fulfilled]: makeAListsAdapter.setAll
	}
});

export const { setData, setMakeAListsSearchText } = makeAListsSlice.actions;
export default makeAListsSlice.reducer;
