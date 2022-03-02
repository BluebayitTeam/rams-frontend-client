import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CREATE_SITESETTING,
	DELETE_SITESETTING,
	GET_SITESETTINGID,
	UPDATE_SITESETTING
} from '../../../../constant/constants';

export const getSitesetting = createAsyncThunk(
	'sitesettingManagement/sitesetting/getSitesetting',
	async (params, { rejectWithValue }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		try {
			const response = await axios.get(`${GET_SITESETTINGID}${params}`, authTOKEN);
			const data = await response.data;
			return data === undefined ? null : data;
		} catch (err) {
			return rejectWithValue(params);
		}
	}
);

export const removeSitesetting = createAsyncThunk(
	'sitesettingManagement/sitesetting/removeSitesetting',
	async (val, { dispatch, getState }) => {
		const authTOKEN = {
			headers: {
				'Content-type': 'application/json',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};

		const sitesettingId = val.id;
		const response = await axios.delete(`${DELETE_SITESETTING}${sitesettingId}`, authTOKEN);
		return response;
	}
);

export const updateSitesetting = createAsyncThunk(
	'sitesettingManagement/sitesetting/updateSitesetting',
	async (sitesettingData, { dispatch, getState }) => {
		console.log(sitesettingData);
		const { sitesetting } = getState().sitesettingsManagement;
		const sitesettingDataToFormData = jsonToFormData(sitesettingData);
		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.put(
			`${UPDATE_SITESETTING}${sitesetting.id}`,
			sitesettingDataToFormData,
			authTOKEN
		);
		return response;
	}
);

export const saveSitesetting = createAsyncThunk(
	'sitesettingManagement/sitesetting/saveSitesetting',
	async (sitesettingData, { dispatch, getState }) => {
		console.log(sitesettingData);
		const sitesettingDataToFormData = jsonToFormData(sitesettingData);
		const authTOKEN = {
			headers: {
				'Content-type': 'multipart/form-data',
				Authorization: sessionStorage.getItem('jwt_access_token')
			}
		};
		const response = await axios.post(`${CREATE_SITESETTING}`, sitesettingDataToFormData, authTOKEN);
		return response;
	}
);

//buildformdata
const buildFormData = (formData, data, parentKey) => {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach(key => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		const value = data === null ? '' : data;

		formData.append(parentKey, value);
	}
};

//convertJsonToFormData
const jsonToFormData = data => {
	const formData = new FormData();

	buildFormData(formData, data);
	return formData;
};

const sitesettingSlice = createSlice({
	name: 'sitesettingManagement/sitesetting',
	initialState: null,
	reducers: {
		resetSitesetting: () => null,
		newSitesetting: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					site_name: '',
					site_address: '',
					email: '',
					phone: '',
					address: '',
					facebook_url: '',
					twitter_url: '',
					instagram_url: '',
					logo: '',
					favicon: '',
					country_code1: '+880',
					show_country_code1: '+880'
				}
			})
		}
	},
	extraReducers: {
		[getSitesetting.fulfilled]: (state, action) => action.payload,
		[saveSitesetting.fulfilled]: (state, action) => action.payload,
		[removeSitesetting.fulfilled]: (state, action) => action.payload,
		[updateSitesetting.fulfilled]: (state, action) => action.payload
	}
});

export const { newSitesetting, resetSitesetting } = sitesettingSlice.actions;
export default sitesettingSlice.reducer;
