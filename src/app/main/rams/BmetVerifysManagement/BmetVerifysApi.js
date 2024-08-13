import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bmetVerifys'];

const BmetVerifyApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmetVerify: build.query({
				query: (bmetVerifyId) => ({
					url: `${GET_PASSENGER_BY_ID}${bmetVerifyId}`
				}),
				providesTags: ['bmetVerifys'],
				async onQueryStarted(bmetVerifyId, { queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						CustomNotification('error', `${error?.error?.response?.data?.detail}`);
					}
				}
			})
		}),
		overrideExisting: false
	});

export default BmetVerifyApi;

export const { useGetBmetVerifyQuery } = BmetVerifyApi;

export const selectFilteredBmetVerifys = (bmetVerifys) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return bmetVerifys;
		}

		return FuseUtils.filterArrayByString(bmetVerifys, searchText);
	});
