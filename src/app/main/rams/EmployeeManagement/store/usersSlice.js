import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ALL_USERS } from '../../../../constant/constants';

export const getUsers = createAsyncThunk('employeeManagement/users/getUsers', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_token');

    const response = axios.get(ALL_USERS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_userlist_elements', data.data.total_elements);
    sessionStorage.setItem('total_userlist_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.users
});


const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectuserById } = usersAdapter.getSelectors(
    state => state.employeesManagement.usersList
);

const usersSlice = createSlice({
    name: 'employeeManagement/users',
    initialState: usersAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setUsersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: usersAdapter.setAll
    }
});

export const { setData, setUsersSearchText } = usersSlice.actions;
export default usersSlice.reducer;
