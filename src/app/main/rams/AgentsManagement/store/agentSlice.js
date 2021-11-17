import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_AGENT, DELETE_AGENT, GET_AGENT_BY_ID, UPDATE_AGENT } from '../../../../constant/constants';


export const getAgent = createAsyncThunk('agentManagement/agent/getAgent', async (params, { rejectWithValue }) => {
    const authTOKEN = {
        headers: {
            'Content-type': 'application/json',
            Authorization: localStorage.getItem('jwt_access_token'),
        }
    };

    try {
        const response = await axios.get(`${GET_AGENT_BY_ID}${params}`, authTOKEN);
        const data = await response.data;
        return data === undefined ? null : data;
    } catch (err) {

        return rejectWithValue(params)
    }

})

export const removeAgent = createAsyncThunk(
    'agentManagement/agent/removeAgent',
    async (val) => {

        const authTOKEN = {
            headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };

        const agentId = val.id;
        const response = await axios.delete(`${DELETE_AGENT}${agentId}`, authTOKEN);
        return response
    }
);

export const updateAgent = createAsyncThunk(
    'agentManagement/agent/updateAgent',
    async (agentData, { dispatch, getState }) => {
        const { agent } = getState().agentsManagement;

        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;

                formData.append(parentKey, value);
            }
        }

        function jsonToFormData(data) {
            const formData = new FormData();

            buildFormData(formData, data);

            return formData;
        }

        const getFormDateFJ = jsonToFormData(agentData)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.put(`${UPDATE_AGENT}${agent.id}`, getFormDateFJ, authTOKEN);
        return response
    }

)

export const saveAgent = createAsyncThunk(
    'agentManagement/agent/saveAgent',
    async (agentData) => {

        // let modifiedData = agentData
        // const haveExtraData = agentData.balancce_type && agentData.balance_date && agentData.balance_amount && agentData.balance_note

        // if (haveExtraData) {
        //     modifiedData = {
        //         ...agentData,
        //         extra_data: {
        //             balancce_type: agentData.balancce_type,
        //             balance_date: agentData.balance_date,
        //             balance_amount: agentData.balance_amount,
        //             balance_note: agentData.balance_note
        //         }
        //     }
        // }

        // console.log("data", modifiedData)

        function buildFormData(formData, data, parentKey) {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;

                formData.append(parentKey, value);
            }
        }

        function jsonToFormData(data) {
            const formData = new FormData();

            buildFormData(formData, data);

            return formData;
        }

        const getFormDateFJ = jsonToFormData(agentData)

        const authTOKEN = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: localStorage.getItem('jwt_access_token'),
            }
        };
        const response = await axios.post(`${CREATE_AGENT}`, getFormDateFJ, authTOKEN)
        return response
    }
)

const agentSlice = createSlice({
    name: 'agentManagement/agent',
    initialState: null,
    reducers: {
        resetAgent: () => null,
        newAgent: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    country_code1: "+880",
                    // country_code2: "+880",
                    primary_phone: "+880",
                    // secondary_phone: "+880",
                }
            })
        }
    },
    extraReducers: {
        [getAgent.fulfilled]: (state, action) => action.payload,
        [saveAgent.fulfilled]: (state, action) => action.payload,
        [removeAgent.fulfilled]: (state, action) => action.payload,
        [updateAgent.fulfilled]: (state, action) => action.payloHea
    }
})


export const { newAgent, resetAgent } = agentSlice.actions;

export default agentSlice.reducer;