import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MEDICAL_LOG, GET_OFFICE_WORK_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getOfficeWorkEditHistorys = createAsyncThunk(
	'officeWorkEditHistoryManagement/officeWorkEditHistorys/getOfficeWorkEditHistorys',
	async pageAndSize => {
		
		const searchText = sessionStorage.getItem('PassengerEditHistoryId');

		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = axios.get(`${GET_OFFICE_WORK_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;
		sessionStorage.setItem('total_officeWorkEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_officeWorkEditHistorys_pages', data.data.total_pages);

		return data.data.officework_logs || [];
	}
);

const officeWorkEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectOfficeWorkEditHistorys, selectById: selectOfficeWorkEditHistoryById } =
	officeWorkEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.officeWorkEditHistorys);

const officeWorkEditHistorysSlice = createSlice({
	name: 'officeWorkEditHistoryManagement/officeWorkEditHistorys',
	initialState: officeWorkEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOfficeWorkEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOfficeWorkEditHistorys.fulfilled]: officeWorkEditHistorysAdapter.setAll
	}
});

export const { setData, setOfficeWorkEditHistorysSearchText } = officeWorkEditHistorysSlice.actions;
export default officeWorkEditHistorysSlice.reducer;
