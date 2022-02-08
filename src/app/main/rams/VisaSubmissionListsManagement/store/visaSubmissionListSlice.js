import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_VISASUBMISSIONLIST,
	DELETE_VISASUBMISSIONLIST,
	UPDATE_VISASUBMISSIONLIST
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
		const visaSubmissionListDatas = { ...visaSubmissionListData, created_by: '', updated_by: '' };

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
		const visaSubmissionListDatas = { ...visaSubmissionListData, updated_by: '', created_by: '' };

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

const visaSubmissionListSlice = createSlice({
	name: 'visaSubmissionListManagement/visaSubmissionList',
	initialState: null,
	reducers: {
		resetVisaSubmissionList: () => null,
		newVisaSubmissionList: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveVisaSubmissionList.fulfilled]: (state, action) => action.payload,
		[removeVisaSubmissionList.fulfilled]: (state, action) => action.payload,
		[updateVisaSubmissionList.fulfilled]: (state, action) => action.payload
	}
});

export const { newVisaSubmissionList, resetVisaSubmissionList } = visaSubmissionListSlice.actions;

export default visaSubmissionListSlice.reducer;
