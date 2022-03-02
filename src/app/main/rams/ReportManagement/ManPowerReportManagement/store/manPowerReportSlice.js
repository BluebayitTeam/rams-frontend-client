import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MANPOWER_FILTER_BY, MANPOWER_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getManPowers = createAsyncThunk(
	'manPowersReportManagement/getManPowers',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MANPOWER_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&man_power_date_after=${
					values.man_power_date_after || ''
				}&man_power_date_before=${values.man_power_date_before || ''}&delivery_date_after=${
					values.delivery_date_after || ''
				}&delivery_date_before=${values.delivery_date_before || ''}`,
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

export const getAllManPowers = createAsyncThunk(
	'manPowersReportManagement/getAllManPowers',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MANPOWER_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&man_power_date_after=${
					values.man_power_date_after || ''
				}&man_power_date_before=${values.man_power_date_before || ''}&delivery_date_after=${
					values.delivery_date_after || ''
				}&delivery_date_before=${values.delivery_date_before || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const manPowerReportsSlice = createSlice({
	name: 'manPowersReportManagement/manPowers',
	initialState: {
		manPowers: []
	},
	extraReducers: {
		[getManPowers.fulfilled]: (state, action) => {
			state.manPowers = action.payload?.manPowers || [];
		},
		[getManPowers.rejected]: state => {
			state.manPowers = [];
		},
		[getAllManPowers.fulfilled]: (state, action) => {
			state.manPowers = action.payload?.manPowers || [];
		},
		[getAllManPowers.rejected]: state => {
			state.manPowers = [];
		}
	}
});

export default manPowerReportsSlice.reducer;
