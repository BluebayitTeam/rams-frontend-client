import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_RECRUITINGAGENCY, GET_RECRUITINGAGENCYS } from '../../../../constant/constants';

export const getRecruitingAgencys = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgencys/getRecruitingAgencys',
	async pageAndSize => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = sessionStorage.getItem('jwt_access_token');

		const response = axios.get(GET_RECRUITINGAGENCYS, { params: pageAndSize });
		const data = await response;

		sessionStorage.setItem('total_recruitingAgencys_elements', data.data.total_elements);
		sessionStorage.setItem('total_recruitingAgencys_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.recruiting_agencies;
	}
);

export const removeRecruitingAgencys = createAsyncThunk(
	'recruitingAgencyManagement/recruitingAgencys/removeRecruitingAgencys',
	async (recruitingAgencyIds, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		await axios.delete(`${DELETE_RECRUITINGAGENCY}`, { recruitingAgencyIds }, authTOKEN);

		return recruitingAgencyIds;
	}
);

const recruitingAgencysAdapter = createEntityAdapter({});

export const { selectAll: selectRecruitingAgencys, selectById: selectRecruitingAgencyById } =
	recruitingAgencysAdapter.getSelectors(state => state.recruitingAgencysManagement.recruitingAgencys);

const recruitingAgencysSlice = createSlice({
	name: 'recruitingAgencyManagement/recruitingAgencys',
	initialState: recruitingAgencysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setRecruitingAgencysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getRecruitingAgencys.fulfilled]: recruitingAgencysAdapter.setAll
	}
});

export const { setData, setRecruitingAgencysSearchText } = recruitingAgencysSlice.actions;
export default recruitingAgencysSlice.reducer;
