import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_THANA, GET_THANAS } from '../../../../constant/constants';

export const getThanas = createAsyncThunk('thanaManagement/thanas/geThanas', async (parameter) => {
    const { page, size } = parameter
    axios.defaults.headers.common['Content-type'] = 'application/json'
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token')

    const response = axios.get(GET_THANAS, { params: { page, size } });
    const data = await response;

    sessionStorage.setItem("thanas_total_elements", data.data.total_elements)
    sessionStorage.setItem("thanas_total_pages", data.data.total_pages)
    delete axios.defaults.headers.common["Content-type"]
    delete axios.defaults.headers.common.Authorization

    return data.data.thanas
});


export const removeThanas = createAsyncThunk(
    'thanaManagement/thanas/removeThanas',
    async (thanaIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_THANA}`, { thanaIds }, authTOKEN);

        return thanaIds;
    }
);



const thanasAdapter = createEntityAdapter({});

export const { selectAll: selectThanas, selectById: selectThanaById } = thanasAdapter.getSelectors(
    state => state.thanasManagement.thanas
);

const thanasSlice = createSlice({
    name: 'thanaManagement/thanas',
    initialState: thanasAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setThanasSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getThanas.fulfilled]: thanasAdapter.setAll,
    }
});

export const { setData, setThanasSearchText } = thanasSlice.actions;
export default thanasSlice.reducer;