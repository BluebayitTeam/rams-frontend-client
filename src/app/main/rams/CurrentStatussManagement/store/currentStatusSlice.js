import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_CURRENTSTATUS, DELETE_CURRENTSTATUS, GET_CURRENTSTATUS_BY_ID, UPDATE_CURRENTSTATUS } from '../../../../constant/constants';

export const getCurrentStatus = createAsyncThunk('currentStatusManagement/currentStatus/getCurrentStatus', async (params, { rejectWithValue }) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    };

    try {
        const response = await axios.get(`${GET_CURRENTSTATUS_BY_ID}${params}`, authTOKEN);
        const data = await response.data;
        return data === undefined ? null : data;
    } catch (err) {

        return rejectWithValue(params)
    }

})

export const removeCurrentStatus = createAsyncThunk(
    'currentStatusManagement/currentStatus/removeCurrentStatus',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const currentStatusId = val.id;
        const response = await axios.delete(`${DELETE_CURRENTSTATUS}${currentStatusId}`, authTOKEN);
        return response
    }
);

export const updateCurrentStatus = createAsyncThunk(
    'currentStatusManagement/currentStatus/updateCurrentStatus',
    async (currentStatusData, { dispatch, getState }) => {
        const { currentStatus } = getState().currentStatussManagement;


        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_CURRENTSTATUS}${currentStatus.id}`, currentStatusData, authTOKEN);
        return response
    }

)

export const saveCurrentStatus = createAsyncThunk(
    'currentStatusManagement/currentStatus/saveCurrentStatus',
    async (currentStatusData) => {


        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_CURRENTSTATUS}`, currentStatusData, authTOKEN)
        return response
    }
)

const currentStatusSlice = createSlice({
    name: 'currentStatusManagement/currentStatus',
    initialState: null,
    reducers: {
        resetCurrentStatus: () => null,
        newCurrentStatus: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [getCurrentStatus.fulfilled]: (state, action) => action.payload,
        [saveCurrentStatus.fulfilled]: (state, action) => action.payload,
        [removeCurrentStatus.fulfilled]: (state, action) => action.payload,
        [updateCurrentStatus.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newCurrentStatus, resetCurrentStatus } = currentStatusSlice.actions;

export default currentStatusSlice.reducer;