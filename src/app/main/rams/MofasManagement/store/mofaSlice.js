import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MOFA, DELETE_MOFA, UPDATE_MOFA } from '../../../../constant/constants';

export const removeMofa = createAsyncThunk(
    'mofaManagement/mofa/removeMofa',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const mofaId = val.id;
        const response = await axios.delete(`${DELETE_MOFA}${mofaId}`, authTOKEN);
        return response
    }
);

export const updateMofa = createAsyncThunk(
    'mofaManagement/mofa/updateMofa',
    async (mofaData) => {
        const mofaDatas = { ...mofaData, created_by: "", updated_by: "" }
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

        const getFormDateFJ = jsonToFormData(mofaDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_MOFA}${mofaData.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveMofa = createAsyncThunk(
    'mofaManagement/mofa/saveMofa',
    async (mofaData) => {
        const mofaDatas = { ...mofaData, updated_by: "", created_by: "" }
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

        const getFormDateFJ = jsonToFormData(mofaDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_MOFA}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const mofaSlice = createSlice({
    name: 'mofaManagement/mofa',
    initialState: null,
    reducers: {
        resetMofa: () => null,
        newMofa: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveMofa.fulfilled]: (state, action) => action.payload,
        [removeMofa.fulfilled]: (state, action) => action.payload,
        [updateMofa.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newMofa, resetMofa } = mofaSlice.actions;

export default mofaSlice.reducer;