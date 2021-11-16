import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_DEMAND, GET_DEMANDS } from '../../../../constant/constants';

export const getDemands = createAsyncThunk('demandManagement/demands/geDemands', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_DEMANDS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_demands_elements', data.data.total_elements);
    sessionStorage.setItem('total_demands_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    //console.log("listData", data)

    return data.data.demands
});


export const removeDemands = createAsyncThunk(
    'demandManagement/demands/removeDemands',
    async (demandIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_DEMAND}`, { demandIds }, authTOKEN);

        return demandIds;
    }
);


const demandsAdapter = createEntityAdapter({});

export const { selectAll: selectDemands, selectById: selectDemandById } = demandsAdapter.getSelectors(
    state => state.demandsManagement.demands
);

const demandsSlice = createSlice({
    name: 'demandManagement/demands',
    initialState: demandsAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setDemandsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getDemands.fulfilled]: demandsAdapter.setAll
    }
});

export const { setData, setDemandsSearchText } = demandsSlice.actions;
export default demandsSlice.reducer;