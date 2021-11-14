import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_PROFESSION, GET_PROFESSIONS } from '../../../../constant/constants';

export const getProfessions = createAsyncThunk('professionManagement/professions/geProfessions', async (pageAndSize) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    const response = axios.get(GET_PROFESSIONS, { params: pageAndSize });
    const data = await response;

    sessionStorage.setItem('total_professions_elements', data.data.total_elements);
    sessionStorage.setItem('total_professions_pages', data.data.total_pages);
    delete axios.defaults.headers.common['Content-type'];
    delete axios.defaults.headers.common.Authorization;

    return data.data.professions
});

export const removeProfessions = createAsyncThunk(
    'professionManagement/professions/removeProfessions',
    async (professionIds) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${DELETE_PROFESSION}`, { professionIds }, authTOKEN);

        return professionIds;
    }
);

const professionsAdapter = createEntityAdapter({});

export const { selectAll: selectProfessions, selectById: selectProfessionById } = professionsAdapter.getSelectors(
    state => state.professionsManagement.professions
);

const professionsSlice = createSlice({
    name: 'professionManagement/professions',
    initialState: professionsAdapter.getInitialState({
        searchText: ''
    }),
    reducers: {
        setProfessionsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        }
    },
    extraReducers: {
        [getProfessions.fulfilled]: professionsAdapter.setAll
    }
});

export const { setData, setProfessionsSearchText } = professionsSlice.actions;
export default professionsSlice.reducer;