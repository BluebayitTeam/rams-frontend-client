import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FLIGHT_FILTER_BY, FLIGHT_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getFlights = createAsyncThunk(
	'flightsReportManagement/getFlights',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${FLIGHT_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&flight_date_after=${
					values.flight_date_after || ''
				}&flight_date_before=${values.flight_date_before || ''}&ticket_no=${values.ticket_no}`,
				{ params: pageAndSize }
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

export const getAllFlights = createAsyncThunk(
	'flightsReportManagement/getAllFlights',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${FLIGHT_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&flight_date_after=${
					values.flight_date_after || ''
				}&flight_date_before=${values.flight_date_before || ''}&ticket_no=${values.ticket_no || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const flightReportsSlice = createSlice({
	name: 'flightsReportManagement/flights',
	initialState: {
		flights: []
	},
	extraReducers: {
		[getFlights.fulfilled]: (state, action) => {
			state.flights = action.payload?.flights || [];
		},
		[getFlights.rejected]: state => {
			state.flights = [];
		},
		[getAllFlights.fulfilled]: (state, action) => {
			state.flights = action.payload?.flights || [];
		},
		[getAllFlights.rejected]: state => {
			state.flights = [];
		}
	}
});

export default flightReportsSlice.reducer;
