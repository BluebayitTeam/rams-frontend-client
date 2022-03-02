import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ACCOUNTSUMMARY_FILTER_BY, ACCOUNTSUMMARY_FILTER_WITHOUT_PG } from '../../../../../../constant/constants';

export const getAccountSummarys = createAsyncThunk(
	'accountSummarysReportManagement/getAccountSummarys',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${ACCOUNTSUMMARY_FILTER_BY}?start_date=${values.date_after || ''}&end_date=${
					values.date_before || ''
				}`,
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

export const getAllAccountSummarys = createAsyncThunk(
	'accountSummarysReportManagement/getAllAccountSummarys',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${ACCOUNTSUMMARY_FILTER_WITHOUT_PG}?start_date=${values.date_after || ''}&end_date=${
					values.date_before || ''
				}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const accountSummaryReportsSlice = createSlice({
	name: 'accountSummarysReportManagement/accountSummarys',
	initialState: {
		accountSummarys: []
	},
	extraReducers: {
		[getAccountSummarys.fulfilled]: (state, action) => {
			state.accountSummarys = action.payload?.accountSummarys || [];
		},
		[getAccountSummarys.rejected]: state => {
			state.accountSummarys = [];
		},
		[getAllAccountSummarys.fulfilled]: (state, action) => {
			state.accountSummarys = action.payload?.accountSummarys || [];
		},
		[getAllAccountSummarys.rejected]: state => {
			state.accountSummarys = [];
		}
	}
});

export default accountSummaryReportsSlice.reducer;
