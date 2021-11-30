import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MEDICALCENTER, DELETE_MEDICALCENTER, UPDATE_MEDICALCENTER } from '../../../../constant/constants';


export const removeMedicalCenter = createAsyncThunk(
    'medicalCenterManagement/medicalCenter/removeMedicalCenter',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const medicalCenterId = val.id;
        const response = await axios.delete(`${DELETE_MEDICALCENTER}${medicalCenterId}`, authTOKEN);
        return response
    }
);

export const updateMedicalCenter = createAsyncThunk(
    'medicalCenterManagement/medicalCenter/updateMedicalCenter',
    async (medicalCenterData) => {
        const medicalCenterDatas = { ...medicalCenterData, created_by: "" }

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_MEDICALCENTER}${medicalCenterData.id}`, medicalCenterData, authTOKEN);
        return response
    }

)

export const saveMedicalCenter = createAsyncThunk(
    'medicalCenterManagement/medicalCenter/saveMedicalCenter',
    async (medicalCenterData) => {
        const medicalCenterDatas = { ...medicalCenterData, updated_by: "" }

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_MEDICALCENTER}`, medicalCenterData, authTOKEN)
        return response
    }
)

const medicalCenterSlice = createSlice({
    name: 'medicalCenterManagement/medicalCenter',
    initialState: null,
    reducers: {
        resetMedicalCenter: () => null,
        newMedicalCenter: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {}
            })
        }
    },
    extraReducers: {
        [saveMedicalCenter.fulfilled]: (state, action) => action.payload,
        [removeMedicalCenter.fulfilled]: (state, action) => action.payload,
        [updateMedicalCenter.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newMedicalCenter, resetMedicalCenter } = medicalCenterSlice.actions;

export default medicalCenterSlice.reducer;