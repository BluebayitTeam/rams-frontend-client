import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_CITY, DELETE_CITY, GET_CITYID, UPDATE_CITY } from '../../../../constant/constants';

export const getCity = createAsyncThunk('cityManagement/city/getCity', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_CITYID}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeCity = createAsyncThunk('cityManagement/city/removeCity', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const cityId = val.id;
	const response = await axios.delete(`${DELETE_CITY}${cityId}`, authTOKEN);
	return response;
});

export const updateCity = createAsyncThunk(
	'cityManagement/city/updateCity',
	async (cityData, { dispatch, getState }) => {
		const { city } = getState().citysManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_CITY}${city.id}`, cityData, authTOKEN);
		return response;
	}
);

export const saveCity = createAsyncThunk('cityManagement/city/saveCity', async cityData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_CITY}`, cityData, authTOKEN);
	return response;
});

const citySlice = createSlice({
	name: 'cityManagement/city',
	initialState: null,
	reducers: {
		resetCity: () => null,
		newCity: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getCity.fulfilled]: (state, action) => action.payload,
		[saveCity.fulfilled]: (state, action) => action.payload,
		[removeCity.fulfilled]: (state, action) => action.payload,
		[updateCity.fulfilled]: (state, action) => action.payload
	}
});

export const { newCity, resetCity } = citySlice.actions;

export default citySlice.reducer;
