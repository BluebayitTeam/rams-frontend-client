import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MOFA_FILTER_BY, MOFA_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getMofas = createAsyncThunk(
	'mofasReportManagement/getMofas',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MOFA_FILTER_BY}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
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

export const getAllMofas = createAsyncThunk(
	'mofasReportManagement/getAllMofas',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${MOFA_FILTER_WITHOUT_PG}?agent=${values.agent || ''}&passenger=${values.passenger || ''}&gender=${
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

const mofaReportsSlice = createSlice({
	name: 'mofasReportManagement/mofas',
	initialState: {
		mofas: []
	},
	extraReducers: {
		[getMofas.fulfilled]: (state, action) => {
			state.mofas = action.payload?.mofas || [];
		},
		[getMofas.rejected]: state => {
			state.mofas = [];
		},
		[getAllMofas.fulfilled]: (state, action) => {
			state.mofas = action.payload?.mofas || [];
		},
		[getAllMofas.rejected]: state => {
			state.mofas = [];
		}
	}
});

export default mofaReportsSlice.reducer;
