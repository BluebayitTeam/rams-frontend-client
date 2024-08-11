import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_SITESETTING,
	DELETE_SITESETTING,
	DELETE_SITESETTING_MULTIPLE,
	GET_SITESETTINGS,
	GET_SITESETTING_BY_ID,
	UPDATE_SITESETTING
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import SiteSettingModel from './siteSetting/models/SiteSettingModel';

export const addTagTypes = ['siteSettings'];
const SiteSettingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSiteSettings: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_SITESETTINGS, params: { page, size, searchKey } }),
				providesTags: ['siteSettings']
			}),
			deleteSiteSettings: build.mutation({
				query: (siteSettingIds) => ({
					url: DELETE_SITESETTING_MULTIPLE,
					method: 'DELETE',
					data: { ids: siteSettingIds }
				}),
				invalidatesTags: ['siteSettings']
			}),
			getSiteSetting: build.query({
				query: (siteSettingId) => ({
					url: `${GET_SITESETTING_BY_ID}${siteSettingId}`
				}),
				providesTags: ['siteSettings']
			}),
			createSiteSetting: build.mutation({
				query: (newSiteSetting) => ({
					url: CREATE_SITESETTING,
					method: 'POST',
					data: jsonToFormData(SiteSettingModel(newSiteSetting))
				}),
				invalidatesTags: ['siteSettings']
			}),
			updateSiteSetting: build.mutation({
				query: (siteSetting) => ({
					url: `${UPDATE_SITESETTING}${siteSetting.id}`,
					method: 'PUT',
					data: jsonToFormData(siteSetting)
				}),
				invalidatesTags: ['siteSettings']
			}),
			deleteSiteSetting: build.mutation({
				query: (siteSettingId) => ({
					url: `${DELETE_SITESETTING}${siteSettingId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['siteSettings']
			})
		}),
		overrideExisting: false
	});
export default SiteSettingApi;
export const {
	useGetSiteSettingsQuery,
	useDeleteSiteSettingsMutation,
	useGetSiteSettingQuery,
	useUpdateSiteSettingMutation,
	useDeleteSiteSettingMutation,

	useCreateSiteSettingMutation
} = SiteSettingApi;

export const selectFilteredSiteSettings = (siteSettings) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return siteSettings;
		}

		return FuseUtils.filterArrayByString(siteSettings, searchText);
	});
