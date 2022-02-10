import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VISASBLISTS, VISASBLISTS_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';

export const getVisaSbLists = createAsyncThunk(
	'visaSbListsReportManagement/getVisaSbLists',
	async ({ pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(`${VISASBLISTS}`, { params: pageAndSize });

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

export const getAllVisaSbLists = createAsyncThunk(
	'visaSbListsReportManagement/getAllVisaSbLists',
	async (_values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(`${VISASBLISTS_WITHOUT_PG}`);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

const visaSbListReportsSlice = createSlice({
	name: 'visaSbListsReportManagement/visaSbLists',
	initialState: {
		visaSbLists: []
	},
	extraReducers: {
		[getVisaSbLists.fulfilled]: (state, action) => {
			state.visaSbLists = action.payload?.visaSbLists || [];
		},
		[getVisaSbLists.rejected]: state => {
			state.visaSbLists = [];
		},
		[getAllVisaSbLists.fulfilled]: (state, action) => {
			state.visaSbLists = action.payload?.visaSbLists || [];
		},
		[getAllVisaSbLists.rejected]: state => {
			state.visaSbLists = [];
		}
	}
});

export default visaSbListReportsSlice.reducer;
