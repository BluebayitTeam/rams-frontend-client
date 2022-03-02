import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_CITY, GET_CITYS } from '../../../../constant/constants';

export const getCitys = createAsyncThunk('cityManagement/citys/getCitys', async parameter => {
	const { page, size } = parameter;

	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

	const response = axios.get(GET_CITYS, { params: { page, size } });
	const data = await response;

	sessionStorage.setItem('cities_total_elements', data.data.total_elements);
	sessionStorage.setItem('cities_total_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	return data.data.cities;
});

export const removeCitys = createAsyncThunk(
	'cityManagement/citys/removeCitys',
	async (cityIds, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		await axios.delete(`${DELETE_CITY}`, { cityIds }, authTOKEN);

		return cityIds;
	}
);

const citysAdapter = createEntityAdapter({});

export const { selectAll: selectCitys, selectById: selectCityById } = citysAdapter.getSelectors(
	state => state.citysManagement.citys
);

const citysSlice = createSlice({
	name: 'cityManagement/citys',
	initialState: citysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCitysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCitys.fulfilled]: citysAdapter.setAll
	}
});

export const { setData, setCitysSearchText } = citysSlice.actions;
export default citysSlice.reducer;
