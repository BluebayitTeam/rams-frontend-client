import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_MAKEALIST_CLM_BY_ID, UPDATE_MAKEALIST_CLM } from '../../../../../constant/constants';
import { columns } from '../data/column';

export const getMakeAListClms = createAsyncThunk(
	'makeAListClmsManagement/makeAListClms/getMakeAListClms',
	async (params, { rejectWithValue, getState }) => {
		const { makeAListClm } = getState().makeAListClmsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_MAKEALIST_CLM_BY_ID}${1}`, authTOKEN);
			const data = await response.data;
			const updatedClmsData = makeAListClm.map(clm => ({ ...clm, isChecked: data[clm.key] }));
			console.log('updatedClmsData', updatedClmsData);
			return updatedClmsData;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const updateMakeAListClms = createAsyncThunk(
	'makeAListClmsManagement/makeAListClms/updateMakeAListClms',
	async (listId, { getState }) => {
		const { makeAListClm } = getState().makeAListClmsManagement;
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: localStorage.getItem('jwt_access_token')
			}
		};
		const columnsData = {};
		makeAListClm.map(clm => (columnsData[clm.key] = clm.isChecked));
		const response = await axios.put(`${UPDATE_MAKEALIST_CLM}${1}`, columnsData, authTOKEN);
		return response;
	}
);

const makeAListClmsSlice = createSlice({
	name: 'makeAListClmsManagement/makeAListClms',
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
