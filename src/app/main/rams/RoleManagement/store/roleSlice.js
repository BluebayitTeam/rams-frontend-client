import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_ROLE, DELETE_ROLE, GET_ROLE, UPDATE_ROLE } from '../../../../constant/constants';

export const getRole = createAsyncThunk(
    'roleManagement/role/getRole', async (params) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        const response = await axios.get(`${GET_ROLE}${params.roleId}`, authTOKEN)
        const data = await response.data;
        return data === undefined ? null : data;

    })



export const removeRole = createAsyncThunk('roleManagement/role/removeRole',
    async (val) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        const roleId = val.id;
        const response = await axios.delete(`${DELETE_ROLE}${roleId}`, authTOKEN);
        return response
    }
);

export const updateRole = createAsyncThunk(
    'roleManagement/role/updateRole',
    async (roleData, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        const { role } = getState().rolesManagement;

        const response = await axios.put(`${UPDATE_ROLE}${role.id}`, roleData, authTOKEN);
        return response
    }
)

export const saveRole = createAsyncThunk(
    'roleManagement/role/saveRole',
    async (roleData) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        const response = await axios.post(`${CREATE_ROLE}`, roleData, authTOKEN)
        return response
    }
)

const roleSlice = createSlice({
    name: 'roleManagement/role',
    initialState: null,
    reducers: {
        resetRole: () => null,
        newRole: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    name: '',
                    permissions: [],
                }
            })
        }
    },
    extraReducers: {
        [getRole.fulfilled]: (state, action) => action.payload,
        [saveRole.fulfilled]: (state, action) => action.payload,
        [removeRole.fulfilled]: (state, action) => action.payload,
        [updateRole.fulfilled]: (state, action) => action.payload
    }
})

export const { newRole, resetRole } = roleSlice.actions;

export default roleSlice.reducer;