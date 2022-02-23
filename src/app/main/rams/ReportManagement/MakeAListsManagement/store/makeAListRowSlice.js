import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	CREATE_MAKEALIST,
	DELETE_MAKEALIST,
	GET_MAKEALIST_BY_ID,
	UPDATE_MAKEALIST
} from '../../../../../constant/constants';

export const getMakeAListRow = createAsyncThunk(
	'makeAListRowManagement/makeAListRow/getMakeAListRow',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MAKEALIST_BY_ID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeMakeAListRow = createAsyncThunk(
	'makeAListRowManagement/makeAListRow/removeMakeAListRow',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const makeAListRowId = val.id;
		const response = await axios.delete(`${DELETE_MAKEALIST}${makeAListRowId}`, authTOKEN);
		return response;
	}
);

export const updateMakeAListRow = createAsyncThunk(
	'makeAListRowManagement/makeAListRow/updateMakeAListRow',
	async (makeAListRowData, { dispatch, getState }) => {
		const { makeAListRow } = getState().makeAListRowsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MAKEALIST}${makeAListRow.id}`, makeAListRowData, authTOKEN);
		return response;
	}
);

export const saveMakeAListRow = createAsyncThunk(
	'makeAListRowManagement/makeAListRow/saveMakeAListRow',
	async makeAListRowData => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_MAKEALIST}`, makeAListRowData, authTOKEN);
		return response;
	}
);

const makeAListRowSlice = createSlice({
	name: 'makeAListRowManagement/makeAListRow',
	initialState: null,
	reducers: {
		resetMakeAListRow: () => null,
		newMakeAListRow: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					make_date: moment(new Date()).format('YYYY-MM-DD')
				}
			})
		}
	},
	extraReducers: {
		[getMakeAListRow.fulfilled]: (_state, action) => action.payload,
		[saveMakeAListRow.fulfilled]: (_state, action) => action.payload,
		[removeMakeAListRow.fulfilled]: (_state, action) => action.payload,
		[updateMakeAListRow.fulfilled]: (_state, action) => action.payload
	}
});

export const { newMakeAListRow, resetMakeAListRow } = makeAListRowSlice.actions;

export default makeAListRowSlice.reducer;
