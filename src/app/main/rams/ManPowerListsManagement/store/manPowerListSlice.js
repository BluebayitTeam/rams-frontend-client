import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_MANPOWERLIST, DELETE_MANPOWERLIST, UPDATE_MANPOWERLIST } from '../../../../constant/constants';

export const removeManPowerList = createAsyncThunk(
	'manPowerListManagement/manPowerList/removeManPowerList',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		const manPowerListId = val.id;
		const response = await axios.delete(`${DELETE_MANPOWERLIST}${manPowerListId}`, authTOKEN);
		return response;
	}
);

export const updateManPowerList = createAsyncThunk(
	'manPowerListManagement/manPowerList/updateManPowerList',
	async manPowerListData => {
		const manPowerListDatas = { ...manPowerListData, created_by: '' };

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(`${UPDATE_MANPOWERLIST}${manPowerListData.id}`, manPowerListData, authTOKEN);
		return response;
	}
);

export const saveManPowerList = createAsyncThunk(
	'manPowerListManagement/manPowerList/saveManPowerList',
	async manPowerListData => {
		const manPowerListDatas = { ...manPowerListData, updated_by: '' };

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_MANPOWERLIST}`, manPowerListData, authTOKEN);
		return response;
	}
);

const manPowerListSlice = createSlice({
	name: 'manPowerListManagement/manPowerList',
	initialState: null,
	reducers: {
		resetManPowerList: () => null,
		newManPowerList: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveManPowerList.fulfilled]: (state, action) => action.payload,
		[removeManPowerList.fulfilled]: (state, action) => action.payload,
		[updateManPowerList.fulfilled]: (state, action) => action.payload
	}
});

export const { newManPowerList, resetManPowerList } = manPowerListSlice.actions;

export default manPowerListSlice.reducer;
