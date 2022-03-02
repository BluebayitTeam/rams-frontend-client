import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TRAINING_FILTER_BY, TRAINING_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getTrainings = createAsyncThunk(
	'trainingsReportManagement/getTrainings',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${TRAINING_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}`,
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

export const getAllTrainings = createAsyncThunk(
	'trainingsReportManagement/getAllTrainings',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${TRAINING_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
					values.gender || ''
				}&passenger_type=${values.passenger_type || ''}&country=${values.country || ''}&date_after=${
					values.date_after || ''
				}&date_before=${values.date_before || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const trainingReportsSlice = createSlice({
	name: 'trainingsReportManagement/trainings',
	initialState: {
		trainings: []
	},
	extraReducers: {
		[getTrainings.fulfilled]: (state, action) => {
			state.trainings = action.payload?.trainings || [];
		},
		[getTrainings.rejected]: state => {
			state.trainings = [];
		},
		[getAllTrainings.fulfilled]: (state, action) => {
			state.trainings = action.payload?.trainings || [];
		},
		[getAllTrainings.rejected]: state => {
			state.trainings = [];
		}
	}
});

export default trainingReportsSlice.reducer;
