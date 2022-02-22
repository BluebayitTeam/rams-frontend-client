import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fillUnderscoreBySpace from 'app/@helpers/fillUnderscoreBySpace';
import { AGENT_FILTER_BY, AGENT_FILTER_WITHOUT_PG, MAKE_A_LIST_CLMS } from 'app/constant/constants';
import axios from 'axios';

export const getMakeALists = createAsyncThunk(
	'makeAListsManagement/getMakeALists',
	async ({ values, pageAndSize }, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${AGENT_FILTER_BY}?username=${values.username || ''}&email=${values.email || ''}&group=${
					values.group || ''
				}&makeAList_code=${values.makeAList_code || ''}&primary_phone=${values.primary_phone || ''}&district=${
					values.district || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`,
				{ params: pageAndSize }
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

export const getAllMakeALists = createAsyncThunk(
	'makeAListsManagement/getAllMakeALists',
	async (values, { rejectWithValue }) => {
		try {
			axios.defaults.headers.common['Content-type'] = 'application/json';
			axios.defaults.headers.common.Authorization = localStorage.getItem('jwt_access_token');

			const res = await axios.get(
				`${AGENT_FILTER_WITHOUT_PG}?username=${values.username || ''}&email=${values.email || ''}&group=${
					values.group || ''
				}&makeAList_code=${values.makeAList_code || ''}&primary_phone=${values.primary_phone || ''}&district=${
					values.district || ''
				}&date_after=${values.date_after || ''}&date_before=${values.date_before || ''}`
			);

			delete axios.defaults.headers.common['Content-type'];
			delete axios.defaults.headers.common.Authorization;

			return res.data || {};
		} catch (err) {
			return rejectWithValue({});
		}
	}
);

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

const makeAListReportsSlice = createSlice({
	name: 'makeAListsManagement/makeALists',
	initialState: {
		makeALists: [],
		makeAListClms: []
	},
	extraReducers: {
		[getMakeALists.fulfilled]: (state, action) => {
			state.makeALists = action.payload?.makeALists || [];
		},
		[getMakeALists.rejected]: state => {
			state.makeALists = [];
		},
		[getAllMakeALists.fulfilled]: (state, action) => {
			state.makeALists = action.payload?.makeALists || [];
		},
		[getAllMakeALists.rejected]: state => {
			state.makeALists = [];
		},
		[getColumns.fulfilled]: (state, action) => {
			state.makeAListClms = action.payload || [];
		},
		[getColumns.rejected]: state => {
			state.makeAListClms = [];
		}
	}
});

export default makeAListReportsSlice.reducer;
