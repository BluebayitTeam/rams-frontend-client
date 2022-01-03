import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AGENT_FILTER_BY, AGENT_FILTER_WITHOUT_PG } from 'app/constant/constants';
import axios from 'axios';


export const getAgents = createAsyncThunk(
    'agentsReportManagement/getAgents',
    async ({ values, pageAndSize }) => {

        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

        const res = await axios.get(`${AGENT_FILTER_BY}?username=${values.username || ""}&email=${values.email || ""}&group=${values.groupName || ""}&agent_code=${values.agent_code || ""}&primary_phone=${values.primary_phone || ""}&district=${values.ditrictName || ""}&date_after=${values.date_after || ""}&date_before=${values.date_before || ""}`, { params: pageAndSize })

        delete axios.defaults.headers.common['Content-type'];
        delete axios.defaults.headers.common.Authorization;

        console.log(res);
        return res.data
    })


export const getAllAgents = createAsyncThunk(
    'agentsReportManagement/getAllAgents',
    async (values) => {

        axios.defaults.headers.common['Content-type'] = 'application/json';
        axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

        const res = await axios.get(`${AGENT_FILTER_WITHOUT_PG}?username=${values.username || ""}&email=${values.email || ""}&group=${values.groupName || ""}&agent_code=${values.agent_code || ""}&primary_phone=${values.primary_phone || ""}&district=${values.ditrictName || ""}&date_after=${values.date_after || ""}&date_before=${values.date_before || ""}`)

        delete axios.defaults.headers.common['Content-type'];
        delete axios.defaults.headers.common.Authorization;

        console.log(res);
        return res.data
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
            state.agents = action.payload?.agents || []
        },
        [getAllAgents.fulfilled]: (state, action) => {
            state.agents = action.payload?.agents || []
        }
    }
});

export const {
    setOrdersSearchText,
} = passengerReportsSlice.actions;
export default passengerReportsSlice.reducer;
