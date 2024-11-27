import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_FLIGHT_LOG, GET_MEDICAL_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getFlightEditHistorys = createAsyncThunk(
	'flightEditHistoryManagement/flightEditHistorys/getFlightEditHistorys',
	async pageAndSize => {
		const searchText = sessionStorage.getItem('PassengerEditHistoryId');

		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = axios.get(`${GET_FLIGHT_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_flightEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_flightEditHistorys_pages', data.data.total_pages);

		return data.data.medical_logs || [];
	}
);

const flightEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectFlightEditHistorys, selectById: selectFlightEditHistoryById } =
	flightEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.flightEditHistorys);

const flightEditHistorysSlice = createSlice({
	name: 'flightEditHistoryManagement/flightEditHistorys',
	initialState: flightEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setFlightEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getFlightEditHistorys.fulfilled]: flightEditHistorysAdapter.setAll
	}
});

export const { setData, setFlightEditHistorysSearchText } = flightEditHistorysSlice.actions;
export default flightEditHistorysSlice.reducer;
