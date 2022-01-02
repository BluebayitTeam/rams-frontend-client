import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AGENT_FILTER_BY, AGENT_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';


export const getAgents = createAsyncThunk(
    'agentsReportManagement/agents',
    async ({ values, pageAndSize }) => {

        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

        const res = await axios.get(`${AGENT_FILTER_BY}?username=${values.username || ""}&email=${values.email || ""}&group=${values.groupName || ""}&agent_code=${values.agent_code || ""}&primary_phone=${values.primary_phone || ""}&district=${values.ditrictName || ""}&date_after=${values.date_after || ""}&date_before=${values.date_before || ""}`, { params: pageAndSize })

        sessionStorage.setItem('total_report_agents_elements', res.data.total_elements);
        sessionStorage.setItem('total_report_agents_pages', res.data.total_pages);

        delete axios.defaults.headers.common['Content-type'];
        delete axios.defaults.headers.common.Authorization;

        console.log(res);
        return res.data.agents || []
    })


export const getAllAgents = createAsyncThunk(
    'agentsReportManagement/agents',
    async (values) => {

        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

        const res = await axios.get(`${AGENT_FILTER_WITHOUT_PG}?username=${values.username || ""}&email=${values.email || ""}&group=${values.groupName || ""}&agent_code=${values.agent_code || ""}&primary_phone=${values.primary_phone || ""}&district=${values.ditrictName || ""}&date_after=${values.date_after || ""}&date_before=${values.date_before || ""}`)

        sessionStorage.setItem('total_report_agents_elements', res.data.total_elements);
        sessionStorage.setItem('total_report_agents_pages', res.data.total_pages);

        delete axios.defaults.headers.common['Content-type'];
        delete axios.defaults.headers.common.Authorization;

        console.log(res);
        return res.data.agents || []
    })

const agentsReportsAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = agentsReportsAdapter.getSelectors(
    state => state.agentsReportManagement.agents
);

const passengerReportsSlice = createSlice({
    name: 'agentsReportManagement/agents',
    initialState: agentsReportsAdapter.getInitialState({
        searchText: '',
        agents: [],
    }),
    reducers: {
        setOrdersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event?.target?.value || '' })
        },
    },
    extraReducers: {
        [getAgents.fulfilled]: (state, action) => {
            state.agents = action.payload
        },
        [getAllAgents.fulfilled]: (state, action) => {
            state.agents = action.payload
        }
    }
});

export const {
    setOrdersSearchText,
} = passengerReportsSlice.actions;
export default passengerReportsSlice.reducer;
