import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_GROUP_MULTIPLE, GET_GROUPS } from '../../../../../constant/constants';

export const getGroups = createAsyncThunk('groupManagement/groups/geGroups', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const response = axios.get(GET_GROUPS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_groups_elements', data.data.total_elements);
	sessionStorage.setItem('total_groups_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.groups;
});

export const removeGroups = createAsyncThunk('groupManagement/groups/removeGroups', async groupIds => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: localStorage.getItem('jwt_access_token')
	};
	const data = {
		ids: groupIds
	};
	const response = await axios.delete(`${DELETE_GROUP_MULTIPLE}`, { headers, data });

	console.log('delteMultipleGroupRes', response);
	return response;
});

const groupsAdapter = createEntityAdapter({});

export const { selectAll: selectGroups, selectById: selectGroupById } = groupsAdapter.getSelectors(
	state => state.groupsManagement.groups
);

const groupsSlice = createSlice({
	name: 'groupManagement/groups',
	initialState: groupsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setGroupsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getGroups.fulfilled]: groupsAdapter.setAll
	}
});

export const { setData, setGroupsSearchText } = groupsSlice.actions;
export default groupsSlice.reducer;
