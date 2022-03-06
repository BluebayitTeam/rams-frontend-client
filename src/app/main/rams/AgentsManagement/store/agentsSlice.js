import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_AGENT, GET_AGENTS } from '../../../../constant/constants';

export const getAgents = createAsyncThunk('agentManagement/agents/getAgents', async pageAndSize => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const response = axios.get(GET_AGENTS, { params: pageAndSize });
	const data = await response;

	sessionStorage.setItem('total_agents_elements', data.data.total_elements);
	sessionStorage.setItem('total_agents_pages', data.data.total_pages);
	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	//console.log("listData", data)

	return data.data.agents;
});

export const removeAgents = createAsyncThunk('agentManagement/agents/removeAgents', async agentIds => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	await axios.delete(`${DELETE_AGENT}`, { agentIds }, authTOKEN);

	return agentIds;
});

const agentsAdapter = createEntityAdapter({});

export const { selectAll: selectAgents, selectById: selectAgentById } = agentsAdapter.getSelectors(
	state => state.agentsManagement.agents
);

const agentsSlice = createSlice({
	name: 'agentManagement/agents',
	initialState: agentsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setAgentsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getAgents.fulfilled]: agentsAdapter.setAll
	}
});

export const { setData, setAgentsSearchText } = agentsSlice.actions;
export default agentsSlice.reducer;
