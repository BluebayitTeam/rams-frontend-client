import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_PASSENGERS_BY_TYPE } from '../../../../constant/constants';

export const getPassengers = createAsyncThunk(
	'passengerManagement/passengers/getPassengers',
	async ({ page, size, passengerType }) => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		console.log('passengerType', passengerType);

		const response = axios.get(`${GET_PASSENGERS_BY_TYPE}?name=${passengerType}&page${page}&size=${size}`);
		const data = await response;

		sessionStorage.setItem('total_passengers_elements', data.data.total_elements);
		sessionStorage.setItem('total_passengers_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		console.log('listData', data);

		return data?.data?.passengers || [];
	}
);

const passengersAdapter = createEntityAdapter({});

export const { selectAll: selectPassengers, selectById: selectPassengerById } = passengersAdapter.getSelectors(
	state => state.passengersManagement.passengers
);

const passengersSlice = createSlice({
	name: 'passengerManagement/passengers',
	initialState: passengersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPassengersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPassengers.fulfilled]: passengersAdapter.setAll
	}
});

export const { setData, setPassengersSearchText } = passengersSlice.actions;
export default passengersSlice.reducer;
