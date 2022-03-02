import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PASSENGER_SUMMARY_FILTER_BY, PASSENGER_SUMMARY_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getPassengerSummarys = createAsyncThunk(
	'passengerSummarysReportManagement/getPassengerSummarys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_SUMMARY_FILTER_BY}?p=1${values.passenger ? `&passenger=${values.passenger}` : ''}${
					values.agent ? `&agent=${values.agent}` : ''
				}${values.gender ? `&gender=${values.gender}` : ''}${
					values.passenger_type ? `&passenger_type=${values.passenger_type}` : ''
				}${values.country ? `&country=${values.country}` : ''}${
					values.demand ? `&demand=${values.demand}` : ''
				}${values.passenger_agent ? `&passenger_agent=${values.passenger_agent}` : ''}${
					values.visa_number ? `&visa_number=${values.visa_number}` : ''
				}${values.profession ? `&profession=${values.profession}` : ''}${
					values.mofa_status ? `&mofa_status=${values.mofa_status}` : ''
				}${values.stamping_date_after ? `&stamping_date_after=${values.stamping_date_after}` : ''}${
					values.stamping_date_before ? `&stamping_date_before=${values.stamping_date_before}` : ''
				}${values.stamping_status ? `&stamping_status=${values.stamping_status}` : ''}${
					values.medical_result ? `&medical_result=${values.medical_result}` : ''
				}${
					values.medical_expiry_date_after
						? `&medical_expiry_date_after=${values.medical_expiry_date_after}`
						: ''
				}${
					values.medical_expiry_date_before
						? `&medical_expiry_date_before=${values.medical_expiry_date_before}`
						: ''
				}${values.police_clearance_status ? `&police_clearance_status=${values.police_clearance_status}` : ''}${
					values.driving_license_status ? `&driving_license_status=${values.driving_license_status}` : ''
				}${values.finger_status ? `&finger_status=${values.finger_status}` : ''}${
					values.training_card_status ? `&training_card_status=${values.training_card_status}` : ''
				}${values.man_power_date_after ? `man_power_date_after=${values.man_power_date_after}` : ''}${
					values.man_power_date_before ? `&man_power_date_before=${values.man_power_date_before}` : ''
				}${values.man_power_status ? `&man_power_status=${values.man_power_status}` : ''}${
					values.visa_agent ? `&visa_agent=${values.visa_agent}` : ''
				}${values.current_status ? `&current_status=${values.current_status}` : ''}`,
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
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${PASSENGER_SUMMARY_FILTER_WITHOUT_PG}?p=1${values.passenger ? `&passenger=${values.passenger}` : ''}${
					values.agent ? `&agent=${values.agent}` : ''
				}${values.gender ? `&gender=${values.gender}` : ''}${
					values.passenger_type ? `&passenger_type=${values.passenger_type}` : ''
				}${values.country ? `&country=${values.country}` : ''}${
					values.demand ? `&demand=${values.demand}` : ''
				}${values.passenger_agent ? `&passenger_agent=${values.passenger_agent}` : ''}${
					values.visa_number ? `&visa_number=${values.visa_number}` : ''
				}${values.profession ? `&profession=${values.profession}` : ''}${
					values.mofa_status ? `&mofa_status=${values.mofa_status}` : ''
				}${values.stamping_date_after ? `&stamping_date_after=${values.stamping_date_after}` : ''}${
					values.stamping_date_before ? `&stamping_date_before=${values.stamping_date_before}` : ''
				}${values.stamping_status ? `&stamping_status=${values.stamping_status}` : ''}${
					values.medical_result ? `&medical_result=${values.medical_result}` : ''
				}${
					values.medical_expiry_date_after
						? `&medical_expiry_date_after=${values.medical_expiry_date_after}`
						: ''
				}${
					values.medical_expiry_date_before
						? `&medical_expiry_date_before=${values.medical_expiry_date_before}`
						: ''
				}${values.police_clearance_status ? `&police_clearance_status=${values.police_clearance_status}` : ''}${
					values.driving_license_status ? `&driving_license_status=${values.driving_license_status}` : ''
				}${values.finger_status ? `&finger_status=${values.finger_status}` : ''}${
					values.training_card_status ? `&training_card_status=${values.training_card_status}` : ''
				}${values.man_power_date_after ? `man_power_date_after=${values.man_power_date_after}` : ''}${
					values.man_power_date_before ? `&man_power_date_before=${values.man_power_date_before}` : ''
				}${values.man_power_status ? `&man_power_status=${values.man_power_status}` : ''}${
					values.visa_agent ? `&visa_agent=${values.visa_agent}` : ''
				}${values.current_status ? `&current_status=${values.current_status}` : ''}`
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
