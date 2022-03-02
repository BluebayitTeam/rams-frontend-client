import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_VISAREISSUELIST, DELETE_VISAREISSUELIST, UPDATE_VISAREISSUELIST } from '../../../../constant/constants';

export const removeVisaReissueList = createAsyncThunk(
	'visaReissueListManagement/visaReissueList/removeVisaReissueList',
	async val => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const visaReissueListId = val.id;
		const response = await axios.delete(`${DELETE_VISAREISSUELIST}${visaReissueListId}`, authTOKEN);
		return response;
	}
);

export const updateVisaReissueList = createAsyncThunk(
	'visaReissueListManagement/visaReissueList/updateVisaReissueList',
	async visaReissueListData => {
		const visaReissueListDatas = { ...visaReissueListData, created_by: '', updated_by: '' };

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(
			`${UPDATE_VISAREISSUELIST}${visaReissueListData.id}`,
			visaReissueListData,
			authTOKEN
		);
		return response;
	}
);

export const saveVisaReissueList = createAsyncThunk(
	'visaReissueListManagement/visaReissueList/saveVisaReissueList',
	async visaReissueListData => {
		const visaReissueListDatas = { ...visaReissueListData, updated_by: '', created_by: '' };

		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_VISAREISSUELIST}`, visaReissueListData, authTOKEN);
		return response;
	}
);

const visaReissueListSlice = createSlice({
	name: 'visaReissueListManagement/visaReissueList',
	initialState: null,
	reducers: {
		resetVisaReissueList: () => null,
		newVisaReissueList: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {}
			})
		}
	},
	extraReducers: {
		[saveVisaReissueList.fulfilled]: (state, action) => action.payload,
		[removeVisaReissueList.fulfilled]: (state, action) => action.payload,
		[updateVisaReissueList.fulfilled]: (state, action) => action.payload
	}
});

export const { newVisaReissueList, resetVisaReissueList } = visaReissueListSlice.actions;

export default visaReissueListSlice.reducer;
