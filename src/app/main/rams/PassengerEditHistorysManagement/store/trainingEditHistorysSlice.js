import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MEDICAL_LOG, GET_TRAINING_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getTrainingEditHistorys = createAsyncThunk(
	'trainingEditHistoryManagement/trainingEditHistorys/getTrainingEditHistorys',
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
		const response = axios.get(`${GET_TRAINING_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_trainingEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_trainingEditHistorys_pages', data.data.total_pages);

		return data.data.training_logs || [];
	}
);

const trainingEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectTrainingEditHistorys, selectById: selectTrainingEditHistoryById } =
	trainingEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.trainingEditHistorys);

const trainingEditHistorysSlice = createSlice({
	name: 'trainingEditHistoryManagement/trainingEditHistorys',
	initialState: trainingEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setTrainingEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getTrainingEditHistorys.fulfilled]: trainingEditHistorysAdapter.setAll
	}
});

export const { setData, setTrainingEditHistorysSearchText } = trainingEditHistorysSlice.actions;
export default trainingEditHistorysSlice.reducer;
