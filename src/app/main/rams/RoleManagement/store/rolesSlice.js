import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_ROLES } from '../../../../constant/constants';

export const getRoles = createAsyncThunk('roleManagement/roles/getRoles', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const response = axios.get(GET_ROLES, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_roles_elements', data.data.total_elements);
	sessionStorage.setItem('total_roles_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.roles;
});

const RolesAdapter = createEntityAdapter({});

export const { selectAll: selectRoles, selectById: selectRoleById } = RolesAdapter.getSelectors(
	state => state.rolesManagement.roles
);

const rolesSlice = createSlice({
	name: 'roleManagement/roles',
	initialState: RolesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setRolesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getRoles.fulfilled]: RolesAdapter.setAll
	}
});

export const { setData, setRolesSearchText } = rolesSlice.actions;
export default rolesSlice.reducer;
