import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	CREATE_MAKEALIST,
	DELETE_MAKEALIST,
	GET_MAKEALIST_BY_ID,
	UPDATE_MAKEALIST
} from '../../../../../constant/constants';

export const getMakeAListReport = createAsyncThunk(
	'makeAListReportManagement/makeAListReport/getMakeAListReport',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MAKEALIST_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeMakeAListReport = createAsyncThunk(
	'makeAListReportManagement/makeAListReport/removeMakeAListReport',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const makeAListReportId = val.id;
		const response = await axios.delete(`${DELETE_MAKEALIST}${makeAListReportId}`, authTOKEN);
		return response;
	}
);

export const updateMakeAListReport = createAsyncThunk(
	'makeAListReportManagement/makeAListReport/updateMakeAListReport',
	async (makeAListReportData, { dispatch, getState }) => {
		const { makeAListReport } = getState().makeAListReportsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MAKEALIST}${makeAListReport.id}`, makeAListReportData, authTOKEN);
		return response;
	}
);

export const saveMakeAListReport = createAsyncThunk(
	'makeAListReportManagement/makeAListReport/saveMakeAListReport',
	async makeAListReportData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_MAKEALIST}`, makeAListReportData, authTOKEN);
		return response;
	}
);

const makeAListReportSlice = createSlice({
	name: 'makeAListReportManagement/makeAListReport',
	initialState: null,
	reducers: {
		resetMakeAListReport: () => null,
		newMakeAListReport: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					make_date: moment(new Date()).format('YYYY-MM-DD')
				}
			})
		}
	},
	extraReducers: {
		[getMakeAListReport.fulfilled]: (_state, action) => action.payload,
		[saveMakeAListReport.fulfilled]: (_state, action) => action.payload,
		[removeMakeAListReport.fulfilled]: (_state, action) => action.payload,
		[updateMakeAListReport.fulfilled]: (_state, action) => action.payload
	}
});

export const { newMakeAListReport, resetMakeAListReport } = makeAListReportSlice.actions;

export default makeAListReportSlice.reducer;
