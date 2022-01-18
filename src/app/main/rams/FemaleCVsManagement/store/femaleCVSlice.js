import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_FEMALECV, DELETE_FEMALECV, UPDATE_FEMALECV } from '../../../../constant/constants';

export const removeFemaleCV = createAsyncThunk(
    'femaleCVManagement/femaleCV/removeFemaleCV',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const femaleCVId = val.id;
        const response = await axios.delete(`${DELETE_FEMALECV}${femaleCVId}`, authTOKEN);
        return response
    }
);

export const updateFemaleCV = createAsyncThunk(
    'femaleCVManagement/femaleCV/updateFemaleCV',
    async (femaleCVData) => {
        const femaleCVDatas = { ...femaleCVData, created_by: "" }
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

        const getFormDateFJ = jsonToFormData(femaleCVDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_FEMALECV}${femaleCVData.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveFemaleCV = createAsyncThunk(
    'femaleCVManagement/femaleCV/saveFemaleCV',
    async (femaleCVData) => {
        const femaleCVDatas = { ...femaleCVData, updated_by: "" }
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

        const getFormDateFJ = jsonToFormData(femaleCVDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_FEMALECV}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const femaleCVSlice = createSlice({
    name: 'femaleCVManagement/femaleCV',
    initialState: null,
    reducers: {
        resetFemaleCV: () => null,
        newFemaleCV: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveFemaleCV.fulfilled]: (state, action) => action.payload,
        [removeFemaleCV.fulfilled]: (state, action) => action.payload,
        [updateFemaleCV.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newFemaleCV, resetFemaleCV } = femaleCVSlice.actions;

export default femaleCVSlice.reducer;