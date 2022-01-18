import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_CURRENTSTATUS, GET_CURRENTSTATUSS } from '../../../../constant/constants';

export const getCurrentStatuss = createAsyncThunk('currentStatusManagement/currentStatuss/geCurrentStatuss', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_CURRENTSTATUSS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_currentStatuss_elements', data.data.total_elements);
    sessionStorage.setItem('total_currentStatuss_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.current_statuses
});


export const removeCurrentStatuss = createAsyncThunk(
    'currentStatusManagement/currentStatuss/removeCurrentStatuss',
    async (currentStatusIds) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_CURRENTSTATUS}`, { currentStatusIds }, authTOKEN);

        return currentStatusIds;
    }
);


const currentStatussAdapter = createEntityAdapter({});

export const { selectAll: selectCurrentStatuss, selectById: selectCurrentStatusById } = currentStatussAdapter.getSelectors(
    state => state.currentStatussManagement.currentStatuss
);

const currentStatussSlice = createSlice({
    name: 'currentStatusManagement/currentStatuss',
    initialState: currentStatussAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setCurrentStatussSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getCurrentStatuss.fulfilled]: currentStatussAdapter.setAll
    }
});

export const { setData, setCurrentStatussSearchText } = currentStatussSlice.actions;
export default currentStatussSlice.reducer;