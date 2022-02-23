import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fillUnderscoreBySpace from 'app/@helpers/fillUnderscoreBySpace';
import { GET_PASSENGER_BY_ID, MAKE_A_LIST_CLMS } from 'app/constant/constants';
import axios from 'axios';

export const getColumns = createAsyncThunk('makeAListsManagement/getColumns', async () => {
	axios.defaults.headers.common['Content-type'] = 'application/json';
	axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

	const res = await axios.get(MAKE_A_LIST_CLMS);

	delete axios.defaults.headers.common['Content-type'];
	delete axios.defaults.headers.common.Authorization;

	const modifiedData = [];
	const columns = res.data?.make_list_columns?.[0];
	for (let x in columns) {
		x !== 'id' &&
			modifiedData.push({
				key: x,
				label: fillUnderscoreBySpace(x.slice(0, x.lastIndexOf('_'))),
				isChecked: columns[x]
			});
	}
	return modifiedData || [];
});

export const addPPTableRow = createAsyncThunk('makeAListsManagement/addPPTableRow', async pid => {
	const passengerRow = await axios.get(`${GET_PASSENGER_BY_ID}${pid}`);

	console.log('passengerRow', passengerRow);

	return passengerRow?.data;
});

const makeAListReportsSlice = createSlice({
	name: 'makeAListsManagement/makeALists',
	initialState: {
		makeALists: [],
		makeAListClms: [],
		ppTableRows: []
	},
	extraReducers: {
		[getColumns.fulfilled]: (state, action) => {
			state.makeAListClms = action.payload || [];
		},
		[getColumns.rejected]: state => {
			state.makeAListClms = [];
		},
		[addPPTableRow.fulfilled]: (state, action) => {
			if (action.payload) {
				state.ppTableRows = [...state.ppTableRows, action.payload];
			}
		}
	}
});

export default makeAListReportsSlice.reducer;
