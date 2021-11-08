import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_MENU, GET_MENUS_ALL } from '../../../../constant/constants';

export const getMenus = createAsyncThunk('menuManagement/menus/geMenus', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_MENUS_ALL, { params: pageAndSize });
    const data = await response;

    // sessionStorage.setItem('total_menus_elements', response.data.total_elements);
    // sessionStorage.setItem('total_menus_pages', response.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.menu_items
});


export const removeMenus = createAsyncThunk(
    'menuManagement/menus/removeMenus',
    async (menuIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_MENU}`, { menuIds }, authTOKEN);

        return menuIds;
    }
);



const menusAdapter = createEntityAdapter({});

export const { selectAll: selectMenus, selectById: selectMenuById } = menusAdapter.getSelectors(
    state => state.menusManagement.menus
);

const menusSlice = createSlice({
    name: 'menuManagement/menus',
    initialState: menusAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setMenusSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getMenus.fulfilled]: menusAdapter.setAll
    }
});

export const { setData, setMenusSearchText } = menusSlice.actions;
export default menusSlice.reducer;