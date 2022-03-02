import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_QUALIFICATION, GET_QUALIFICATIONS } from '../../../../constant/constants';

export const getQualifications = createAsyncThunk(
	'qualificationManagement/qualifications/getQualifications',
	async parameter => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const { page, size } = parameter;
		const response = axios.get(GET_QUALIFICATIONS, { params: { page, size } });
		const data = await response;

		sessionStorage.setItem('qualifications_total_elements', data.data.total_elements);
		sessionStorage.setItem('qualifications_total_pages', data.data.total_pages);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return data.data.qualifications;
	}
);

export const removeQualifications = createAsyncThunk(
	'qualificationManagement/qualifications/removeQualifications',
	async (qualificationIds, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		await axios.delete(`${DELETE_QUALIFICATION}`, { qualificationIds }, authTOKEN);

		return qualificationIds;
	}
);

const qualificationsAdapter = createEntityAdapter({});

export const { selectAll: selectQualifications, selectById: selectQualificationById } =
	qualificationsAdapter.getSelectors(state => state.qualificationsManagement.qualifications);

const qualificationsSlice = createSlice({
	name: 'qualificationManagement/qualifications',
	initialState: qualificationsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setQualificationsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getQualifications.fulfilled]: qualificationsAdapter.setAll
	}
});

export const { setData, setQualificationsSearchText } = qualificationsSlice.actions;
export default qualificationsSlice.reducer;
