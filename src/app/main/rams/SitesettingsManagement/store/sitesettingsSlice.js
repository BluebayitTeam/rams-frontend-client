import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { DELETE_SITESETTING, GET_SITESETTINGS } from '../../../../constant/constants';

export const getSitesettings = createAsyncThunk('sitesettingManagement/sitesettings/getSitesettings', async () => {
	const authTOKEN = {
		headers: {
			'Content-type': 'application/json',
			Authorization: sessionStorage.getItem('jwt_access_token')
		}
	};

	const response = axios.get(GET_SITESETTINGS, authTOKEN);
	console.log(response);
	const data = await response;
	console.log(data);
	return data.data.general_settings;
});

export const removeSitesettings = createAsyncThunk(
	'sitesettingManagement/sitesettings/removeSitesettings',
	async (sitesettingIds, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		await axios.delete(`${DELETE_SITESETTING}`, { sitesettingIds }, authTOKEN);

		return sitesettingIds;
	}
);

const sitesettingsAdapter = createEntityAdapter({});

export const { selectAll: selectSitesettings, selectById: selectSitesettingById } = sitesettingsAdapter.getSelectors(
	state => state.sitesettingsManagement.sitesettings
);

const sitesettingsSlice = createSlice({
	name: 'sitesettingManagement/sitesettings',
	initialState: sitesettingsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSitesettingsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSitesettings.fulfilled]: sitesettingsAdapter.setAll
	}
});

export const { setData, setSitesettingsSearchText } = sitesettingsSlice.actions;
export default sitesettingsSlice.reducer;
