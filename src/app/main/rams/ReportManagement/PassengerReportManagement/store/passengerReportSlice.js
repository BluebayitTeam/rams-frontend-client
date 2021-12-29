import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { AGENT_FILTER_BY, GET_AGENTS } from 'app/constant/constants';
import axios from 'axios';


export const removeOrders = createAsyncThunk(
    'orderManagement/orders/removeOrders',
    async (orderIds, { dispatch, getState }) => {
        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        }
        await axios.delete(`${GET_TOP_CATEGORIES}`, { orderIds }, authTOKEN);

        return orderIds;
    }
);

export const getAgents = (values, pageAndSize) => (dispatch) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    axios.get(`${AGENT_FILTER_BY}?username=${values.username || ""}&email=${values.email || ""}&group=${values.groupName || ""}&agent_code=${values.agent_code || ""}&primary_phone=${values.primary_phone || ""}&district=${values.ditrictName || ""}&date_after=${values.date_after || ""}&date_before=${values.date_before || ""}`, { params: pageAndSize })
        .then(res => {
            console.log(res);
            dispatch(setAgents(res.data.agents || []));

            sessionStorage.setItem('total_products_elements', res.data.total_elements);
            sessionStorage.setItem('total_products_pages', res.data.total_pages);
            delete axios.defaults.headers.common['Content-type'];
            delete axios.defaults.headers.common.Authorization;

        }).catch(() => {
            dispatch(setAgents([]))
        })
}


export const getAllAgents = (pageAndSize) => (dispatch) => {

    axios.defaults.headers.common['Content-type'] = 'application/json';
    axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

    axios.get(GET_AGENTS, { params: pageAndSize })
        .then(res => {
            dispatch(setAgents(res.data.agents || []));
            sessionStorage.setItem('total_products_elements', res.data.total_elements);
            sessionStorage.setItem('total_products_pages', res.data.total_pages);
            delete axios.defaults.headers.common['Content-type'];
            delete axios.defaults.headers.common.Authorization;
        }).catch(() => {
            dispatch(setAgents([]))
        })
}

const salesReportsAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = salesReportsAdapter.getSelectors(
    state => state.passengersReportManagement.passengerReports
);

const passengerReportsSlice = createSlice({
    name: 'passengersReportManagement/orders',
    initialState: salesReportsAdapter.getInitialState({
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
        setAgents: (state, action) => {
            state.agents = action.payload
        },
    },
});

export const {
    setOrdersSearchText,
    setAgents
} = passengerReportsSlice.actions;
export default passengerReportsSlice.reducer;
