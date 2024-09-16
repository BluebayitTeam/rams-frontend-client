import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERSBLISTS_BY_DATE } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bmetV2Applications'];
const BmetV2ApplicationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmetV2Applications: build.query({
				query: ({ bmetV2ApplicationDate }) => {
					if (!bmetV2ApplicationDate) {
						return { url: null };
					}

					return {
						url: MANPOWERSBLISTS_BY_DATE,
						params: {
							bmet_v2_application_date: bmetV2ApplicationDate
						}
					};
				},
				async onQueryStarted({ queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						// Check if the response is an empty array
						if (Array.isArray(data) && data.length === 0) {
							CustomNotification('error', 'There are no manpower records');
						}
					} catch (error) {
						// CustomNotification('error', error?.error?.response?.data?.detail);
					}
				},
				providesTags: ['bmetV2Applications']
			})
		}),
		overrideExisting: false
	});
export default BmetV2ApplicationApi;
export const { useGetBmetV2ApplicationsQuery } = BmetV2ApplicationApi;

export const selectFilteredBmetV2Applications = (bmetV2Applications) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return bmetV2Applications;
		}

		return FuseUtils.filterArrayByString(bmetV2Applications, searchText);
	});
