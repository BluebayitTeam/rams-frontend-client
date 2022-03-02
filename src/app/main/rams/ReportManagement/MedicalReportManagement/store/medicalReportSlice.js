import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MEDICAL_FILTER_BY, MEDICAL_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getMedicals = createAsyncThunk(
	'medicalsReportManagement/getMedicals',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MEDICAL_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&report_date_after=${
					values.report_date_after || ''
				}&report_date_before=${values.report_date_before || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&expiry_date_after=${
					values.expiry_date_after || ''
				}&expiry_date_before=${values.expiry_date_before || ''}&country=${values.country || ''}`,
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

export const getAllMedicals = createAsyncThunk(
	'medicalsReportManagement/getAllMedicals',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MEDICAL_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&report_date_after=${
					values.report_date_after || ''
				}&report_date_before=${values.report_date_before || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}&expiry_date_after=${
					values.expiry_date_after || ''
				}&expiry_date_before=${values.expiry_date_before || ''}&country=${values.country || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const medicalReportsSlice = createSlice({
	name: 'medicalsReportManagement/medicals',
	initialState: {
		medicals: []
	},
	extraReducers: {
		[getMedicals.fulfilled]: (state, action) => {
			state.medicals = action.payload?.medicals || [];
		},
		[getMedicals.rejected]: state => {
			state.medicals = [];
		},
		[getAllMedicals.fulfilled]: (state, action) => {
			state.medicals = action.payload?.medicals || [];
		},
		[getAllMedicals.rejected]: state => {
			state.medicals = [];
		}
	}
});

export default medicalReportsSlice.reducer;
