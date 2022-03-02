import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PASSENGER_FILTER_BY, PASSENGER_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getPassengers = createAsyncThunk(
	'passengersReportManagement/getPassengers',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_FILTER_BY}?passenger=${values.passenger || ''}&current_status=${
					values.current_status || ''
				}&country=${values.target_country || ''}&agent=${values.agent || ''}&passenger_type=${
					values.passenger_type || ''
				}&gender=${values.gender || ''}&date_after=${values.date_after || ''}&date_before=${
					values.date_before || ''
				}`,
				{ params: pageAndSize }
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			console.log(res);
			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

export const getAllPassengers = createAsyncThunk(
	'passengersReportManagement/getAllPassengers',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_FILTER_WITHOUT_PG}?passenger=${values.passenger || ''}&current_status=${
					values.current_status || ''
				}&country=${values.target_country || ''}&agent=${values.agent || ''}&passenger_type=${
					values.passenger_type || ''
				}&gender=${values.gender || ''}&date_after=${values.date_after || ''}&date_before=${
					values.date_before || ''
				}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			console.log(res);
			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const passengerReportsSlice = createSlice({
	name: 'passengersReportManagement/passengers',
	initialState: {
		passengers: []
	},
	extraReducers: {
		[getPassengers.fulfilled]: (state, action) => {
			state.passengers = action.payload?.passengers || [];
		},
		[getPassengers.rejected]: state => {
			state.passengers = [];
		},
		[getAllPassengers.fulfilled]: (state, action) => {
			state.passengers = action.payload?.passengers || [];
		},
		[getAllPassengers.rejected]: state => {
			state.passengers = [];
		}
	}
});

export default passengerReportsSlice.reducer;
