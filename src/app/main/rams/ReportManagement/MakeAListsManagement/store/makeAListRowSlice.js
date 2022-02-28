import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	GET_MAKEALIST_ROW_BY_LIST_ID,
	GET_PASSENGER_BY_ID,
	UPDATE_MAKEALIST_ROW
} from '../../../../../constant/constants';

export const getMakeAListRows = createAsyncThunk(
	'makeAListsManagement/makeAListRows/getMakeAListRows',
	async ({ listId, pageAndSize }) => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const response = await axios.get(`${GET_MAKEALIST_ROW_BY_LIST_ID}${listId}`, { params: pageAndSize });
		const data = await response.data;
		const modifiedData = data?.make_list_items?.map(listItm => listItm?.passenger);

		sessionStorage.setItem('total_makeAListRowsTable_elements', data?.total_elements || 0);
		sessionStorage.setItem('total_makeAListRowsTable_pages', data?.total_pages || 1);
		delete axios.defaults.headers.common['Content-type'];
		delete axios.defaults.headers.common.Authorization;

		return modifiedData;
	}
);

export const updateMakeAListRows = createAsyncThunk(
	'makeAListsManagement/makeAListRows/updateMakeAListRows',
	async (listId, { getState }) => {
		const { makeAListRows } = getState().makeAListsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const passengerIds = makeAListRows.map(row => row.id);

		const response = await axios.put(`${UPDATE_MAKEALIST_ROW}${listId}`, { passengerIds }, authTOKEN);
		return response;
	}
);

export const addMakeAListRow = createAsyncThunk(
	'makeAListsManagement/makeAListRows/addMakeAListRow',
	async (pId, { getState }) => {
		const { makeAListRows } = getState().makeAListsManagement;
		console.log('getState', makeAListRows);
		if (makeAListRows.findIndex(pp => pp?.id === pId) < 0) {
			const authTOKEN = {
				headers: {
					'Content-type': 'application/json',
					Authorization: localStorage.getItem('jwt_access_token')
				}
			};
			const response = await axios.get(`${GET_PASSENGER_BY_ID}${pId}`, authTOKEN);
			const data = response.data;
			return data || {};
		} else {
			return null;
		}
	}
);

const makeAListRowsSlice = createSlice({
	name: 'makeAListsManagement/makeAListRows',
	initialState: [],
	reducers: {
		resetMakeAListRows: () => [],
		removeMakeAListRow: (state, action) => {
			const targetIndx = state.findIndex(pp => pp.id === action.payload);
			if (targetIndx >= 0) {
				state.splice(targetIndx, 1);
			}
		}
	},
	extraReducers: {
		[getMakeAListRows.fulfilled]: (_state, action) => action.payload,
		[addMakeAListRow.fulfilled]: (state, action) => (action.payload ? [...state, action.payload] : state)
	}
});

export const { removeMakeAListRow, resetMakeAListRows } = makeAListRowsSlice.actions;

export default makeAListRowsSlice.reducer;
