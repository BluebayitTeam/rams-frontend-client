import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_PASSENGER_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getPassengerEditHistorys = createAsyncThunk(
	'passengerEditHistoryManagement/passengerEditHistorys/getPassengerEditHistorys',
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
		const response = axios.get(`${GET_PASSENGER_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_passengerEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_passengerEditHistorys_pages', data.data.total_pages);

		return data.data.passenger_logs || [];
	}
);

const passengerEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectPassengerEditHistorys, selectById: selectPassengerEditHistoryById } =
	passengerEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.passengerEditHistorys);

const passengerEditHistorysSlice = createSlice({
	name: 'passengerEditHistoryManagement/passengerEditHistorys',
	initialState: passengerEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPassengerEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPassengerEditHistorys.fulfilled]: passengerEditHistorysAdapter.setAll
	}
});

export const { setData, setPassengerEditHistorysSearchText } = passengerEditHistorysSlice.actions;
export default passengerEditHistorysSlice.reducer;
