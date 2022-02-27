import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import {
	CREATE_MAKEALIST,
	DELETE_MAKEALIST,
	GET_MAKEALIST_BY_ID,
	UPDATE_MAKEALIST
} from '../../../../../constant/constants';

export const getMakeAList = createAsyncThunk(
	'makeAListsManagement/makeAList/getMakeAList',
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

export const removeMakeAList = createAsyncThunk('makeAListsManagement/makeAList/removeMakeAList', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const makeAListId = val.id;
	const response = await axios.delete(`${DELETE_MAKEALIST}${makeAListId}`, authTOKEN);
	return response;
});

export const updateMakeAList = createAsyncThunk(
	'makeAListsManagement/makeAList/updateMakeAList',
	async (makeAListData, { dispatch, getState }) => {
		const { makeAList } = getState().makeAListsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MAKEALIST}${makeAList.id}`, makeAListData, authTOKEN);
		return response;
	}
);

export const saveMakeAList = createAsyncThunk('makeAListsManagement/makeAList/saveMakeAList', async makeAListData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_MAKEALIST}`, makeAListData, authTOKEN);
	return response;
});

const makeAListSlice = createSlice({
	name: 'makeAListsManagement/makeAList',
	initialState: null,
	reducers: {
		resetMakeAList: () => null,
		newMakeAList: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {
					make_date: moment(new Date()).format('YYYY-MM-DD')
				}
			})
		}
	},
	extraReducers: {
		[getMakeAList.fulfilled]: (_state, action) => action.payload,
		[saveMakeAList.fulfilled]: (_state, action) => action.payload,
		[removeMakeAList.fulfilled]: (_state, action) => action.payload,
		[updateMakeAList.fulfilled]: (_state, action) => action.payload
	}
});

export const { newMakeAList, resetMakeAList } = makeAListSlice.actions;

export default makeAListSlice.reducer;
