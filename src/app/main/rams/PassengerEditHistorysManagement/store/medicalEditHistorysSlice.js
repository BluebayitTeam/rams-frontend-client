import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { GET_MEDICAL_LOG } from 'app/constant/constants';
import axios from 'axios';

export const getMedicalEditHistorys = createAsyncThunk(
	'medicalEditHistoryManagement/medicalEditHistorys/getMedicalEditHistorys',
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
		const response = axios.get(`${GET_MEDICAL_LOG}${searchText}`, { params: pageAndSize }, authTOKEN);
		const data = await response;

		sessionStorage.setItem('total_medicalEditHistorys_elements', data.data.total_elements);
		sessionStorage.setItem('total_medicalEditHistorys_pages', data.data.total_pages);

		return data.data.medical_logs || [];
	}
);

const medicalEditHistorysAdapter = createEntityAdapter({});

export const { selectAll: selectMedicalEditHistorys, selectById: selectMedicalEditHistoryById } =
	medicalEditHistorysAdapter.getSelectors(state => state.passengerEditHistorysManagement.medicalEditHistorys);

const medicalEditHistorysSlice = createSlice({
	name: 'medicalEditHistoryManagement/medicalEditHistorys',
	initialState: medicalEditHistorysAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setMedicalEditHistorysSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMedicalEditHistorys.fulfilled]: medicalEditHistorysAdapter.setAll
	}
});

export const { setData, setMedicalEditHistorysSearchText } = medicalEditHistorysSlice.actions;
export default medicalEditHistorysSlice.reducer;
