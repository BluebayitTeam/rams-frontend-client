import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MUSANED_OKALA_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getMusanedOkalaEditHistorys = createAsyncThunk(
	'musanedOkalaEditHistoryManagement/musanedOkalaEditHistorys/getMusanedOkalaEditHistorys',
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
		const response = axios.get(`${GET_MUSANED_OKALA_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_musanedOkalaEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_musanedOkalaEditHistorys_pages', data.data.total_pages);

		return data.data.musanedokala_logs || [];
	}
);

const musanedOkalaEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectMusanedOkalaEditHistorys, selectById: selectMusanedOkalaEditHistoryById } =
	musanedOkalaEditHistorysAdapter.getSelectors(
		state => state.passengerEditHistorysManagement.musanedOkalaEditHistorys
	);

const musanedOkalaEditHistorysSlice = createSlice({
	name: 'musanedOkalaEditHistoryManagement/musanedOkalaEditHistorys',
	initialState: musanedOkalaEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMusanedOkalaEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMusanedOkalaEditHistorys.fulfilled]: musanedOkalaEditHistorysAdapter.setAll
	}
});

export const { setData, setMusanedOkalaEditHistorysSearchText } = musanedOkalaEditHistorysSlice.actions;
export default musanedOkalaEditHistorysSlice.reducer;
