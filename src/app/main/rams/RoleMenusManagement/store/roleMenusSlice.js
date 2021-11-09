import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_ROLEMENU, GET_ROLEMENUS } from '../../../../constant/constants';

export const getRoleMenus = createAsyncThunk('roleMenuManagement/roleMenus/geRoleMenus', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_ROLEMENUS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_roleMenus_elements', data.data.total_elements);
    sessionStorage.setItem('total_roleMenus_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.role_menus
});


export const removeRoleMenus = createAsyncThunk(
    'roleMenuManagement/roleMenus/removeRoleMenus',
    async (roleMenuIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_ROLEMENU}`, { roleMenuIds }, authTOKEN);

        return roleMenuIds;
    }
);


const roleMenusAdapter = createEntityAdapter({});

export const { selectAll: selectRoleMenus, selectById: selectRoleMenuById } = roleMenusAdapter.getSelectors(
    state => state.roleMenusManagement.roleMenus
);

const roleMenusSlice = createSlice({
    name: 'roleMenuManagement/roleMenus',
    initialState: roleMenusAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setRoleMenusSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getRoleMenus.fulfilled]: roleMenusAdapter.setAll
    }
});

export const { setData, setRoleMenusSearchText } = roleMenusSlice.actions;
export default roleMenusSlice.reducer;
