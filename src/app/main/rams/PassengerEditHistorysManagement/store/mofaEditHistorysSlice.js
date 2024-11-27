import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MOFA_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getMofaEditHistorys = createAsyncThunk(
	'mofaEditHistoryManagement/mofaEditHistorys/getMofaEditHistorys',
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
		const response = axios.get(`${GET_MOFA_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_mofaEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_mofaEditHistorys_pages', data.data.total_pages);

		return data.data.mfoa_logs || [];
	}
);

const mofaEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectMofaEditHistorys, selectById: selectMofaEditHistoryById } =
	mofaEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.mofaEditHistorys);

const mofaEditHistorysSlice = createSlice({
	name: 'mofaEditHistoryManagement/mofaEditHistorys',
	initialState: mofaEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMofaEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMofaEditHistorys.fulfilled]: mofaEditHistorysAdapter.setAll
	}
});

export const { setData, setMofaEditHistorysSearchText } = mofaEditHistorysSlice.actions;
export default mofaEditHistorysSlice.reducer;
