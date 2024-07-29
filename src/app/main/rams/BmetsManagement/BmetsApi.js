import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bmets'];

const BmetApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmet: build.query({
				query: (bmetId) => ({
					url: `${GET_BMET_BY_ID}${bmetId}`
				}),
				providesTags: ['bmets'],
				async onQueryStarted(bmetId, { queryFulfilled }) {
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

export default BmetApi;

export const { useGetBmetsQuery, useGetBmetQuery } = BmetApi;

export const selectFilteredBmets = (bmets) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return bmets;
		}

		return FuseUtils.filterArrayByString(bmets, searchText);
	});
