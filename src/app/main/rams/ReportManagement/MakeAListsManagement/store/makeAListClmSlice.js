import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_MAKEALIST_CLM_BY_LIST_ID, UPDATE_MAKEALIST_CLM } from '../../../../../constant/constants';
import { columns } from '../data/column';

export const getMakeAListClms = createAsyncThunk(
	'makeAListsManagement/makeAListClms/getMakeAListClms',
	async (listId, { rejectWithValue, getState }) => {
		const { makeAListClms } = getState().makeAListsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MAKEALIST_CLM_BY_LIST_ID}${listId}`, authTOKEN);
			const data = await response.data;
			const updatedClmsData = makeAListClms.map(clm => ({ ...clm, isChecked: data[clm.key] }));
			console.log('updatedClmsData', updatedClmsData);
			return updatedClmsData;
		} catch (err) {
			return rejectWithValue();
		}
	}
);

export const updateMakeAListClms = createAsyncThunk(
	'makeAListsManagement/makeAListClms/updateMakeAListClms',
	async (listId, { getState }) => {
		const { makeAListClms } = getState().makeAListsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const columnsData = {};
		makeAListClms.map(clm => (columnsData[clm.key] = clm.isChecked));
		const response = await axios.put(`${UPDATE_MAKEALIST_CLM}${listId}`, columnsData, authTOKEN);
		return response;
	}
);

const makeAListClmsSlice = createSlice({
	name: 'makeAListsManagement/makeAListClms',
	initialState: columns,
	reducers: {
		resetMakeAListClms: () => columns,
		checkOrUnCheck: (state, action) => {
			const payload = action.payload;
			const newState = [...state];
			const targetIndx = newState.findIndex(clm => clm.key === payload.key);
			if (targetIndx >= 0) {
				state[targetIndx] = { ...newState[targetIndx], isChecked: payload.value };
			}
		}
	},
	extraReducers: {
		[getMakeAListClms.fulfilled]: (_state, action) => action.payload
	}
});

export const { checkOrUnCheck, resetMakeAListClms } = makeAListClmsSlice.actions;

export default makeAListClmsSlice.reducer;
