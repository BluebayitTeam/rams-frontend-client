import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MENU, DELETE_MENU, GET_MENUS, UPDATE_MENU } from '../../../../constant/constants';


export const getMenu = createAsyncThunk('menuManagement/menu/getMenu', async (params, { rejectWithValue }) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    };

    try {
        const response = await axios.get(`${GET_MENUS}${params}`, authTOKEN);
        const data = await response.data;
        return data === undefined ? null : data;
    } catch (err) {

        return rejectWithValue(params)
    }

})

export const removeMenu = createAsyncThunk(
    'menuManagement/menu/removeMenu',
    async (val, { dispatch, getState }) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const menuId = val.id;
        const response = await axios.delete(`${DELETE_MENU}${menuId}`, authTOKEN);
        return response
    }
);

export const updateMenu = createAsyncThunk(
    'menuManagement/menu/updateMenu',
    async (menuData, { dispatch, getState }) => {
        const { menu } = getState().menusManagement;


        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_MENU}${menu.id}`, menuData, authTOKEN);
        return response
    }

)

export const saveMenu = createAsyncThunk(
    'menuManagement/menu/saveMenu',
    async (menuData, { dispatch, getState }) => {


        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_MENU}`, menuData, authTOKEN)
        return response
    }
)

const menuSlice = createSlice({
    name: 'menuManagement/menu',
    initialState: null,
    reducers: {
        resetMenu: () => null,
        newMenu: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [getMenu.fulfilled]: (state, action) => action.payload,
        [saveMenu.fulfilled]: (state, action) => action.payload,
        [removeMenu.fulfilled]: (state, action) => action.payload,
        [updateMenu.fulfilled]: (state, action) => action.payload
    }
})


export const { newMenu, resetMenu } = menuSlice.actions;

export default menuSlice.reducer;