import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MANPOWER, DELETE_MANPOWER, UPDATE_MANPOWER } from '../../../../constant/constants';

export const removeManPower = createAsyncThunk(
    'manPowerManagement/manPower/removeManPower',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const manPowerId = val.id;
        const response = await axios.delete(`${DELETE_MANPOWER}${manPowerId}`, authTOKEN);
        return response
    }
);

export const updateManPower = createAsyncThunk(
    'manPowerManagement/manPower/updateManPower',
    async (manPowerData) => {
        const manPowerDatas = { ...manPowerData, created_by: "", updated_by: "" }
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

        const getFormDateFJ = jsonToFormData(manPowerDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_MANPOWER}${manPowerData.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveManPower = createAsyncThunk(
    'manPowerManagement/manPower/saveManPower',
    async (manPowerData) => {
        const manPowerDatas = { ...manPowerData, updated_by: "", created_by: "", }
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

        const getFormDateFJ = jsonToFormData(manPowerDatas)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_MANPOWER}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const manPowerSlice = createSlice({
    name: 'manPowerManagement/manPower',
    initialState: null,
    reducers: {
        resetManPower: () => null,
        newManPower: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveManPower.fulfilled]: (state, action) => action.payload,
        [removeManPower.fulfilled]: (state, action) => action.payload,
        [updateManPower.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newManPower, resetManPower } = manPowerSlice.actions;

export default manPowerSlice.reducer;