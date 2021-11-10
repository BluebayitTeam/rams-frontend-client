import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_ROLEMENU, DELETE_ROLEMENU, GET_ROLEMENU_BY_ID } from '../../../../constant/constants';


export const getRoleMenu = createAsyncThunk('roleMenuManagement/roleMenu/getRoleMenu', async (params, { rejectWithValue }) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    };

    try {
        const response = await axios.get(`${GET_ROLEMENU_BY_ID}${params}`, authTOKEN);
        const data = await response.data;
        return data === undefined ? null : data;
    } catch (err) {

        return rejectWithValue(params)
    }

})

export const removeRoleMenu = createAsyncThunk(
    'roleMenuManagement/roleMenu/removeRoleMenu',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const roleMenuId = val.id;
        const response = await axios.delete(`${DELETE_ROLEMENU}${roleMenuId}`, authTOKEN);
        return response
    }
);

export const updateRoleMenu = createAsyncThunk(
    'roleMenuManagement/roleMenu/updateRoleMenu',
    async (roleMenuData) => {
        // const { roleMenu } = getState().roleMenusManagement;
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_ROLEMENU}`, roleMenuData, authTOKEN)
        return response
    }

)

export const saveRoleMenu = createAsyncThunk(
    'roleMenuManagement/roleMenu/saveRoleMenu',
    async (roleMenuData, { dispatch, getState }) => {


        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_ROLEMENU}`, roleMenuData, authTOKEN)
        return response
    }
)

const roleMenuSlice = createSlice({
    name: 'roleMenuManagement/roleMenu',
    initialState: null,
    reducers: {
        resetRoleMenu: () => null,
        newRoleMenu: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [getRoleMenu.fulfilled]: (state, action) => action.payload,
        [saveRoleMenu.fulfilled]: (state, action) => action.payload,
        [removeRoleMenu.fulfilled]: (state, action) => action.payload,
        [updateRoleMenu.fulfilled]: (state, action) => action.payload
    }
})


export const { newRoleMenu, resetRoleMenu } = roleMenuSlice.actions;

export default roleMenuSlice.reducer;

