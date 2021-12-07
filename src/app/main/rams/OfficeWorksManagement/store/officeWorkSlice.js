import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_OFFICEWORK, DELETE_OFFICEWORK, UPDATE_OFFICEWORK } from '../../../../constant/constants';

export const removeOfficeWork = createAsyncThunk(
    'officeWorkManagement/officeWork/removeOfficeWork',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const officeWorkId = val.id;
        const response = await axios.delete(`${DELETE_OFFICEWORK}${officeWorkId}`, authTOKEN);
        return response
    }
);

export const updateOfficeWork = createAsyncThunk(
    'officeWorkManagement/officeWork/updateOfficeWork',
    async (officeWorkData) => {
        const officeWorkDatas = { ...officeWorkData, created_by: "", updated_by: "", }
        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;

                formData.append(parentKey, value);
            }
        }

        function jsonToFormData(data) {
            const formData = new FormData();

            buildFormData(formData, data);

            return formData;
        }

        const getFormDateFJ = jsonToFormData(officeWorkDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_OFFICEWORK}${officeWorkData.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveOfficeWork = createAsyncThunk(
    'officeWorkManagement/officeWork/saveOfficeWork',
    async (officeWorkData) => {
        const officeWorkDatas = { ...officeWorkData, updated_by: "", created_by: "" }
        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;

                formData.append(parentKey, value);
            }
        }

        function jsonToFormData(data) {
            const formData = new FormData();

            buildFormData(formData, data);

            return formData;
        }

        const getFormDateFJ = jsonToFormData(officeWorkDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_OFFICEWORK}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const officeWorkSlice = createSlice({
    name: 'officeWorkManagement/officeWork',
    initialState: null,
    reducers: {
        resetOfficeWork: () => null,
        newOfficeWork: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveOfficeWork.fulfilled]: (state, action) => action.payload,
        [removeOfficeWork.fulfilled]: (state, action) => action.payload,
        [updateOfficeWork.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newOfficeWork, resetOfficeWork } = officeWorkSlice.actions;

export default officeWorkSlice.reducer;