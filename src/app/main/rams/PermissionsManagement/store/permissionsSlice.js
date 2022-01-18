import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_PERMISSION, GET_PERMISSIONS } from '../../../../constant/constants';

export const getPermissions = createAsyncThunk('permissionManagement/permissions/gePermissions', async (parameter) => {
    axios.defaults.headers.common['Content-type'] = 'application/json'
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token')

    const { page, size } = parameter
    const response = axios.get(GET_PERMISSIONS, { params: { page, size } });
    const data = await response;

    sessionStorage.setItem("permissions_total_elements", data.data.total_elements)
    sessionStorage.setItem("permissions_total_pages", data.data.total_pages)
    delete axios.defaults.headers.common["Content-type"]
    delete axios.defaults.headers.common.Authorization

    return data.data.permissions
});


export const removePermissions = createAsyncThunk(
    'permissionManagement/permissions/removePermissions',
    async (permissionIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_PERMISSION}`, { permissionIds }, authTOKEN);

        return permissionIds;
    }
);



const permissionsAdapter = createEntityAdapter({});

export const { selectAll: selectPermissions, selectById: selectPermissionById } = permissionsAdapter.getSelectors(
    state => state.permissionsManagement.permissions
);

const permissionsSlice = createSlice({
    name: 'permissionManagement/permissions',
    initialState: permissionsAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setPermissionsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getPermissions.fulfilled]: permissionsAdapter.setAll
    }
});

export const { setData, setPermissionsSearchText } = permissionsSlice.actions;
export default permissionsSlice.reducer;
