import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PASSENGER_SUMMARY_FILTER_BY, PASSENGER_SUMMARY_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getPassengerSummarys = createAsyncThunk(
	'passengerSummarysReportManagement/getPassengerSummarys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_SUMMARY_FILTER_BY}?agent=${values.agent || ''}&passenger=${
					values.passenger || ''
				}&gender=${values.gender || ''}&passenger_type=${values.passenger_type || ''}&country=${
					values.country || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`,
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

export const getAllPassengerSummarys = createAsyncThunk(
	'passengerSummarysReportManagement/getAllPassengerSummarys',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_SUMMARY_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${
					values.passenger || ''
				}&gender=${values.gender || ''}&passenger_type=${values.passenger_type || ''}&country=${
					values.country || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const passengerSummaryReportsSlice = createSlice({
	name: 'passengerSummarysReportManagement/passengerSummarys',
	initialState: {
		passengerSummarys: []
	},
	extraReducers: {
		[getPassengerSummarys.fulfilled]: (state, action) => {
			state.passengerSummarys = action.payload?.passengerSummarys || [];
		},
		[getPassengerSummarys.rejected]: state => {
			state.passengerSummarys = [];
		},
		[getAllPassengerSummarys.fulfilled]: (state, action) => {
			state.passengerSummarys = action.payload?.passengerSummarys || [];
		},
		[getAllPassengerSummarys.rejected]: state => {
			state.passengerSummarys = [];
		}
	}
});

export default passengerSummaryReportsSlice.reducer;
