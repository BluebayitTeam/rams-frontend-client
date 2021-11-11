import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_PASSENGERTYPE, GET_PASSENGERTYPES } from '../../../../constant/constants';

export const getPassengerTypes = createAsyncThunk('passengerTypeManagement/passengerTypes/gePassengerTypes', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_PASSENGERTYPES, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_passengerTypes_elements', data.data.total_elements);
    sessionStorage.setItem('total_passengerTypes_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.passenger_types
});


export const removePassengerTypes = createAsyncThunk(
    'passengerTypeManagement/passengerTypes/removePassengerTypes',
    async (passengerTypeIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_PASSENGERTYPE}`, { passengerTypeIds }, authTOKEN);

        return passengerTypeIds;
    }
);

const passengerTypesAdapter = createEntityAdapter({});

export const { selectAll: selectPassengerTypes, selectById: selectPassengerTypeById } = passengerTypesAdapter.getSelectors(
    state => state.passengerTypesManagement.passengerTypes
);

const passengerTypesSlice = createSlice({
    name: 'passengerTypeManagement/passengerTypes',
    initialState: passengerTypesAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setPassengerTypesSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getPassengerTypes.fulfilled]: passengerTypesAdapter.setAll
    }
});

export const { setData, setPassengerTypesSearchText } = passengerTypesSlice.actions;
export default passengerTypesSlice.reducer;
