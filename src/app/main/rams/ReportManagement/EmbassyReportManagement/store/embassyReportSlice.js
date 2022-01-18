import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EMBASSY_FILTER_BY } from 'app/constant/constants';
import axios from 'axios';

export const getEmbassys = createAsyncThunk(
	'embassysReportManagement/getEmbassys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${EMBASSY_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type}&stapping_date_after=${
					values.stapping_date_after || ''
				}&stapping_date_before=${values.stapping_date_before || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&expiry_date_after=${
					values.expiry_date_after || ''
				}&expiry_date_bofore=${values.expiry_date_bofore || ''}&country=${
					values.country || ''
				}&stamping_status=${values.stamping_status || ''}`,
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

export const getAllEmbassys = createAsyncThunk(
	'embassysReportManagement/getAllEmbassys',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${EMBASSY_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type}&stapping_date_after=${
					values.stapping_date_after || ''
				}&stapping_date_before=${values.stapping_date_before || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&expiry_date_after=${
					values.expiry_date_after || ''
				}&expiry_date_bofore=${values.expiry_date_bofore || ''}&country=${
					values.country || ''
				}&stamping_status=${values.stamping_status || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const embassyReportsSlice = createSlice({
	name: 'embassysReportManagement/embassys',
	initialState: {
		embassys: []
	},
	extraReducers: {
		[getEmbassys.fulfilled]: (state, action) => {
			state.embassys = action.payload?.embassys || [];
		},
		[getEmbassys.rejected]: state => {
			state.embassys = [];
		},
		[getAllEmbassys.fulfilled]: (state, action) => {
			state.embassys = action.payload?.embassys || [];
		},
		[getAllEmbassys.rejected]: state => {
			state.embassys = [];
		}
	}
});

export default embassyReportsSlice.reducer;
