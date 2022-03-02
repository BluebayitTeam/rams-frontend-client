import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_BRANCH, GET_BRANCHS } from '../../../../constant/constants';

export const getBranchs = createAsyncThunk('branchManagement/branchs/getBranchs', async parameter => {
	const { page, size } = parameter;

	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_BRANCHS, { params: { page, size } });
	const data = await response;

	sessionStorage.setItem('total_branchs_elements', data.data.total_elements);
	sessionStorage.setItem('total_branchs_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.branches;
});

export const removeBranchs = createAsyncThunk(
	'branchManagement/branchs/removeBranchs',
	async (branchIds, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		await axios.delete(`${DELETE_BRANCH}`, { branchIds }, authTOKEN);
		return branchIds;
	}
);

const branchsAdapter = createEntityAdapter({});

export const { selectAll: selectBranchs, selectById: selectBranchById } = branchsAdapter.getSelectors(
	state => state.branchsManagement.branchs
);

const branchsSlice = createSlice({
	name: 'branchManagement/branchs',
	initialState: branchsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBranchsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBranchs.fulfilled]: branchsAdapter.setAll
	}
});

export const { setData, setBranchsSearchText } = branchsSlice.actions;
export default branchsSlice.reducer;
