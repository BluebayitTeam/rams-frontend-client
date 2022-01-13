import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AGENT_FILTER_BY } from 'app/constant/constants';
import axios from 'axios';

export const getAgents = createAsyncThunk(
	'agentsReportManagement/getAgents',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${AGENT_FILTER_BY}?username=${values.username || ''}&email=${values.email || ''}&group=${
					values.group || ''
				}&agent_code=${values.agent_code || ''}&primary_phone=${values.primary_phone || ''}&district=${
					values.district || ''
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

export const getAllAgents = createAsyncThunk(
	'agentsReportManagement/getAllAgents',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${AGENT_FILTER_BY}?username=${values.username || ''}&email=${values.email || ''}&group=${
					values.group || ''
				}&agent_code=${values.agent_code || ''}&primary_phone=${values.primary_phone || ''}&district=${
					values.district || ''
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

const agentReportsSlice = createSlice({
	name: 'agentsReportManagement/agents',
	initialState: {
		agents: []
	},
	extraReducers: {
		[getAgents.fulfilled]: (state, action) => {
			state.agents = action.payload?.agents || [];
		},
		[getAgents.rejected]: state => {
			state.agents = [];
		},
		[getAllAgents.fulfilled]: (state, action) => {
			state.agents = action.payload?.agents || [];
		},
		[getAllAgents.rejected]: state => {
			state.agents = [];
		}
	}
});

export default agentReportsSlice.reducer;
