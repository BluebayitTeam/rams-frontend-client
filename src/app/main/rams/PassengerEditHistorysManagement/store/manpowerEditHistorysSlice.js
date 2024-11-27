import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MANPOWER_LOG, GET_MEDICAL_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getManpowerEditHistorys = createAsyncThunk(
	'manpowerEditHistoryManagement/manpowerEditHistorys/getManpowerEditHistorys',
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
		const response = axios.get(`${GET_MANPOWER_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_manpowerEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_manpowerEditHistorys_pages', data.data.total_pages);

		return data.data.manpower_logs || [];
	}
);

const manpowerEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectManpowerEditHistorys, selectById: selectManpowerEditHistoryById } =
	manpowerEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.manpowerEditHistorys);

const manpowerEditHistorysSlice = createSlice({
	name: 'manpowerEditHistoryManagement/manpowerEditHistorys',
	initialState: manpowerEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setManpowerEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getManpowerEditHistorys.fulfilled]: manpowerEditHistorysAdapter.setAll
	}
});

export const { setData, setManpowerEditHistorysSearchText } = manpowerEditHistorysSlice.actions;
export default manpowerEditHistorysSlice.reducer;
