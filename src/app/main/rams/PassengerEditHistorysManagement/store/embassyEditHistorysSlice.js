import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_EMBASSY_LOG, GET_MEDICAL_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getEmbassyEditHistorys = createAsyncThunk(
	'embassyEditHistoryManagement/embassyEditHistorys/getEmbassyEditHistorys',
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
		const response = axios.get(`${GET_EMBASSY_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_embassyEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_embassyEditHistorys_pages', data.data.total_pages);

		return data.data.embassy_logs || [];
	}
);

const embassyEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectEmbassyEditHistorys, selectById: selectEmbassyEditHistoryById } =
	embassyEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.embassyEditHistorys);

const embassyEditHistorysSlice = createSlice({
	name: 'embassyEditHistoryManagement/embassyEditHistorys',
	initialState: embassyEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setEmbassyEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getEmbassyEditHistorys.fulfilled]: embassyEditHistorysAdapter.setAll
	}
});

export const { setData, setEmbassyEditHistorysSearchText } = embassyEditHistorysSlice.actions;
export default embassyEditHistorysSlice.reducer;
