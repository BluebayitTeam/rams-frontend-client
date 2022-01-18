import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_VISACANCELLIST, DELETE_VISACANCELLIST, UPDATE_VISACANCELLIST } from '../../../../constant/constants';

export const removeVisaCancelList = createAsyncThunk(
    'visaCancelListManagement/visaCancelList/removeVisaCancelList',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const visaCancelListId = val.id;
        const response = await axios.delete(`${DELETE_VISACANCELLIST}${visaCancelListId}`, authTOKEN);
        return response
    }
);

export const updateVisaCancelList = createAsyncThunk(
    'visaCancelListManagement/visaCancelList/updateVisaCancelList',
    async (visaCancelListData) => {
        const visaCancelListDatas = { ...visaCancelListData, created_by: "", updated_by: "" }

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_VISACANCELLIST}${visaCancelListData.id}`, visaCancelListData, authTOKEN);
        return response
    }

)

export const saveVisaCancelList = createAsyncThunk(
    'visaCancelListManagement/visaCancelList/saveVisaCancelList',
    async (visaCancelListData) => {
        const visaCancelListDatas = { ...visaCancelListData, updated_by: "", created_by: "", }

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_VISACANCELLIST}`, visaCancelListData, authTOKEN)
        return response
    }
)

const visaCancelListSlice = createSlice({
    name: 'visaCancelListManagement/visaCancelList',
    initialState: null,
    reducers: {
        resetVisaCancelList: () => null,
        newVisaCancelList: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveVisaCancelList.fulfilled]: (state, action) => action.payload,
        [removeVisaCancelList.fulfilled]: (state, action) => action.payload,
        [updateVisaCancelList.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newVisaCancelList, resetVisaCancelList } = visaCancelListSlice.actions;

export default visaCancelListSlice.reducer;
