import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_MAKEALIST_CLM_BY_LIST_ID, UPDATE_MAKEALIST_CLM } from '../../../../../constant/constants';
import { columns } from '../data/column';

export const getMakeAListRows = createAsyncThunk(
	'makeAListsManagement/makeAListRows/getMakeAListRows',
	async (listId, { rejectWithValue, getState }) => {
		const { makeAListRow } = getState().makeAListsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MAKEALIST_CLM_BY_LIST_ID}${listId}`, authTOKEN);
			const data = await response.data;
			const updatedClmsData = makeAListRow.map(clm => ({ ...clm, isChecked: data[clm.key] }));
			console.log('updatedClmsData', updatedClmsData);
			return updatedClmsData;
		} catch (err) {
			return rejectWithValue();
		}
	}
);

export const updateMakeAListRows = createAsyncThunk(
	'makeAListsManagement/makeAListRows/updateMakeAListRows',
	async (listId, { getState }) => {
		const { makeAListRow } = getState().makeAListsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const columnsData = {};
		makeAListRow.map(clm => (columnsData[clm.key] = clm.isChecked));
		const response = await axios.put(`${UPDATE_MAKEALIST_CLM}${listId}`, columnsData, authTOKEN);
		return response;
	}
);

const makeAListRowsSlice = createSlice({
	name: 'makeAListsManagement/makeAListRows',
	initialState: columns,
	reducers: {
		resetMakeAListRows: () => columns,
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
		[getMakeAListRows.fulfilled]: (_state, action) => action.payload
	}
});

export const { checkOrUnCheck, resetMakeAListRows } = makeAListRowsSlice.actions;

export default makeAListRowsSlice.reducer;
