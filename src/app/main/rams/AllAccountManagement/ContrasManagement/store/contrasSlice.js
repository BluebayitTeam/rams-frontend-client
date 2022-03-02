import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_CONTRA_MULTIPLE, GET_CONTRAS } from '../../../../../constant/constants';

export const getContras = createAsyncThunk('contraManagement/contras/getContras', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_CONTRAS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_contras_elements', data.data.total_elements);
	sessionStorage.setItem('total_contras_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.contras;
});

export const removeContras = createAsyncThunk('contraManagement/contras/removeContras', async contraIds => {
	const headers = {
		'Content-type': 'application/json',
		Authorization: sessionStorage.getItem('jwt_access_token')
	};
	const data = {
		ids: contraIds
	};
	const response = await axios.delete(`${DELETE_CONTRA_MULTIPLE}`, { headers, data });

	console.log('delteMultipleContraRes', response);
	return response;
});

const contrasAdapter = createEntityAdapter({});

export const { selectAll: selectContras, selectById: selectContraById } = contrasAdapter.getSelectors(
	state => state.contrasManagement.contras
);

const contrasSlice = createSlice({
	name: 'contraManagement/contras',
	initialState: contrasAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setContrasSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getContras.fulfilled]: contrasAdapter.setAll
	}
});

export const { setData, setContrasSearchText } = contrasSlice.actions;
export default contrasSlice.reducer;
