import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_MAKEALIST_ROW,
	DELETE_MAKEALIST_ROW,
	GET_MAKEALIST_ROW_BY_LIST_ID
} from '../../../../../constant/constants';

export const getMakeAListRows = createAsyncThunk(
	'makeAListsManagement/makeAListRows/getMakeAListRows',
	async ({ listId, pageAndSize }) => {
		axios.defaults.headers.common['Content-type'] = 'application/json';
		axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

		const response = await axios.get(`${GET_MAKEALIST_ROW_BY_LIST_ID}${listId}`, { params: pageAndSize });
		const data = await response.data;
		const modifiedData = data?.make_list_items?.map(listItm => ({
			...listItm?.passenger,
			id: listItm.id
		}));

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

		const response = await axios.put(`${CREATE_MAKEALIST_ROW}${listId}`, { passengerIds }, authTOKEN);
		return response;
	}
);

export const addMakeAListRow = createAsyncThunk('makeAListsManagement/makeAListRows/addMakeAListRow', async data => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_MAKEALIST_ROW}`, data, authTOKEN);

	return response;
});

export const removeMakeAListRow = createAsyncThunk(
	'makeAListsManagement/makeAListRows/removeMakeAListRow',
	async id => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const response = await axios.delete(`${DELETE_MAKEALIST_ROW}${id}`, authTOKEN);
		return response;
	}
);

const makeAListRowsSlice = createSlice({
	name: 'makeAListsManagement/makeAListRows',
	initialState: [],
	reducers: {
		resetMakeAListRows: () => []
	},
	extraReducers: {
		[getMakeAListRows.fulfilled]: (_state, action) => action.payload
	}
});

export const { resetMakeAListRows } = makeAListRowsSlice.actions;

export default makeAListRowsSlice.reducer;
