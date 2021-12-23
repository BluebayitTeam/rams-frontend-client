import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_CALLINGEMBATTESTATION, DELETE_CALLINGEMBATTESTATION, UPDATE_CALLINGEMBATTESTATION } from '../../../../constant/constants';

export const removeCallingEmbAttestation = createAsyncThunk(
    'callingEmbAttestationManagement/callingEmbAttestation/removeCallingEmbAttestation',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const callingEmbAttestationId = val.id;
        const response = await axios.delete(`${DELETE_CALLINGEMBATTESTATION}${callingEmbAttestationId}`, authTOKEN);
        return response
    }
);

export const updateCallingEmbAttestation = createAsyncThunk(
    'callingEmbAttestationManagement/callingEmbAttestation/updateCallingEmbAttestation',
    async (callingEmbAttestationData) => {
        const callingEmbAttestationDatas = { ...callingEmbAttestationData, created_by: "", updated_by: "" }
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

        const getFormDateFJ = jsonToFormData(callingEmbAttestationDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_CALLINGEMBATTESTATION}${callingEmbAttestationData.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveCallingEmbAttestation = createAsyncThunk(
    'callingEmbAttestationManagement/callingEmbAttestation/saveCallingEmbAttestation',
    async (callingEmbAttestationData) => {
        const callingEmbAttestationDatas = { ...callingEmbAttestationData, updated_by: "", created_by: "", }
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

        const getFormDateFJ = jsonToFormData(callingEmbAttestationDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_CALLINGEMBATTESTATION}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const callingEmbAttestationSlice = createSlice({
    name: 'callingEmbAttestationManagement/callingEmbAttestation',
    initialState: null,
    reducers: {
        resetCallingEmbAttestation: () => null,
        newCallingEmbAttestation: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveCallingEmbAttestation.fulfilled]: (state, action) => action.payload,
        [removeCallingEmbAttestation.fulfilled]: (state, action) => action.payload,
        [updateCallingEmbAttestation.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newCallingEmbAttestation, resetCallingEmbAttestation } = callingEmbAttestationSlice.actions;

export default callingEmbAttestationSlice.reducer;

