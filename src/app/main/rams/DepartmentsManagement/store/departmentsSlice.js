import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_DEPARTMENT, GET_DEPARTMENTS } from '../../../../constant/constants';

export const getDepartments = createAsyncThunk(
    'departmentManagement/departments/geDepartments', async (parameter) => {
        const { page, size } = parameter

        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

        const response = axios.get(GET_DEPARTMENTS, { params: { page, size } });

        const data = await response;

        sessionStorage.setItem("departments_total_elements", data.data.total_elements);
        sessionStorage.setItem("departments_total_pages", data.data.total_pages);
        delete axios.defaults.headers.common["Content-type"];
        delete axios.defaults.headers.common.Authorization;

        return data.data.departments
    });


export const removeDepartments = createAsyncThunk(
    'departmentManagement/departments/removeDepartments',
    async (departmentIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_DEPARTMENT}`, { departmentIds }, authTOKEN);

        return departmentIds;
    }
);


const departmentsAdapter = createEntityAdapter({});

export const { selectAll: selectDepartments, selectById: selectDepartmentById } = departmentsAdapter.getSelectors(
    state => state.departmentsManagement.departments
);

const departmentsSlice = createSlice({
    name: 'departmentManagement/departments',
    initialState: departmentsAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setDepartmentsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getDepartments.fulfilled]: departmentsAdapter.setAll
    }
});

export const { setData, setDepartmentsSearchText } = departmentsSlice.actions;
export default departmentsSlice.reducer;
