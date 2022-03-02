import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_GROUP, DELETE_GROUP, GET_GROUP_BY_ID, UPDATE_GROUP } from '../../../../../constant/constants';

export const getGroup = createAsyncThunk('groupManagement/group/getGroup', async (params, { rejectWithValue }) => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	try {
		const response = await axios.get(`${GET_GROUP_BY_ID}${params}`, authTOKEN);
		const data = await response.data;
		return data === undefined ? null : data;
	} catch (err) {
		return rejectWithValue(params);
	}
});

export const removeGroup = createAsyncThunk('groupManagement/group/removeGroup', async val => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};

	const groupId = val.id;
	const response = await axios.delete(`${DELETE_GROUP}${groupId}`, authTOKEN);
	return response;
});

export const updateGroup = createAsyncThunk(
	'groupManagement/group/updateGroup',
	async (groupData, { dispatch, getState }) => {
		const { group } = getState().groupsManagement;

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_GROUP}${group.id}`, groupData, authTOKEN);
		return response;
	}
);

export const saveGroup = createAsyncThunk('groupManagement/group/saveGroup', async groupData => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: localStorage.getItem('jwt_access_token')
		}
	};
	const response = await axios.post(`${CREATE_GROUP}`, groupData, authTOKEN);
	return response;
});

const groupSlice = createSlice({
	name: 'groupManagement/group',
	initialState: null,
	reducers: {
		resetGroup: () => null,
		newGroup: {
			reducer: (_state, action) => action.payload,
			prepare: () => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[getGroup.fulfilled]: (_state, action) => action.payload,
		[saveGroup.fulfilled]: (_state, action) => action.payload,
		[removeGroup.fulfilled]: (_state, action) => action.payload,
		[updateGroup.fulfilled]: (_state, action) => action.payload
	}
});

export const { newGroup, resetGroup } = groupSlice.actions;

export default groupSlice.reducer;
