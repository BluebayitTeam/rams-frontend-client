import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_MEDICALCENTER_MULTIPLE, GET_MEDICALCENTERS } from '../../../../constant/constants';

export const getMedicalCenters = createAsyncThunk('medicalCenterManagement/medicalCenters/geMedicalCenters', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_MEDICALCENTERS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_medicalCenters_elements', data.data.total_elements);
    sessionStorage.setItem('total_medicalCenters_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.medical_centers
});


export const removeMedicalCenters = createAsyncThunk(
    'medicalCenterManagement/medicalCenters/removeMedicalCenters',
    async (medicalCenterIds) => {
        const headers = {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
        const data = {
            ids: medicalCenterIds
        }
        const response = await axios.delete(`${DELETE_MEDICALCENTER_MULTIPLE}`, { headers, data });

        console.log("delteMultipleMedicalCenterRes", response)
        return response;
    }
);



const medicalCentersAdapter = createEntityAdapter({});

export const { selectAll: selectMedicalCenters, selectById: selectMedicalCenterById } = medicalCentersAdapter.getSelectors(
    state => state.medicalCentersManagement.medicalCenters
);

const medicalCentersSlice = createSlice({
    name: 'medicalCenterManagement/medicalCenters',
    initialState: medicalCentersAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setMedicalCentersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getMedicalCenters.fulfilled]: medicalCentersAdapter.setAll
    }
});

export const { setData, setMedicalCentersSearchText } = medicalCentersSlice.actions;
export default medicalCentersSlice.reducer;
