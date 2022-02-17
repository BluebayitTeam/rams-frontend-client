import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import {
	CREATE_VISASUBMISSIONLIST,
	DELETE_VISASUBMISSIONLIST,
	UPDATE_VISASUBMISSIONLIST,
	VISASBLISTS_BY_DATE
} from '../../../../constant/constants';

export const removeVisaSubmissionList = createAsyncThunk(
	'visaSubmissionListManagement/visaSubmissionList/removeVisaSubmissionList',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const visaSubmissionListId = val.id;
		const response = await axios.delete(`${DELETE_VISASUBMISSIONLIST}${visaSubmissionListId}`, authTOKEN);
		return response;
	}
);

export const updateVisaSubmissionList = createAsyncThunk(
	'visaSubmissionListManagement/visaSubmissionList/updateVisaSubmissionList',
	async visaSubmissionListData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(
			`${UPDATE_VISASUBMISSIONLIST}${visaSubmissionListData.id}`,
			visaSubmissionListData,
			authTOKEN
		);
		return response;
	}
);

export const saveVisaSubmissionList = createAsyncThunk(
	'visaSubmissionListManagement/visaSubmissionList/saveVisaSubmissionList',
	async visaSubmissionListData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_VISASUBMISSIONLIST}`, visaSubmissionListData, authTOKEN);
		return response;
	}
);

export const getVisaSubmissionList = createAsyncThunk(
	'visaSubmissionListManagement/getVisaSubmissionList',
	async ({ submission_date, passenger }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${VISASBLISTS_BY_DATE}?submission_date=${submission_date || ''}&passenger=${passenger || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue([]);
		}
	}
);

const visaSubmissionListSlice = createSlice({
	name: 'visaSubmissionListManagement/visaSubmissionList',
	initialState: [],
	reducers: {
		resetVisaSubmissionList: () => null,
		newVisaSubmissionList: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: []
			})
		}
	},
	extraReducers: {
		[getVisaSubmissionList.fulfilled]: (_state, action) => (_.isArray(action.payload) ? action.payload : []),
		[getVisaSubmissionList.rejected]: (_state, action) => (_.isArray(action.payload) ? action.payload : []),
		[saveVisaSubmissionList.fulfilled]: state => state,
		[removeVisaSubmissionList.fulfilled]: state => state,
		[updateVisaSubmissionList.fulfilled]: state => state
	}
});

export const { newVisaSubmissionList, resetVisaSubmissionList } = visaSubmissionListSlice.actions;

export default visaSubmissionListSlice.reducer;
