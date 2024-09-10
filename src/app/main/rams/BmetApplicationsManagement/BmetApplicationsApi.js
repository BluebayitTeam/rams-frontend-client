import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MANPOWERSBLISTS_BY_DATE } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bmetApplications'];
const BmetApplicationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmetApplications: build.query({
				query: ({ manPowerDate }) => {
					if (!manPowerDate) {
						return { url: null };
					}

					return {
						url: MANPOWERSBLISTS_BY_DATE,
						params: {
							man_power_date: manPowerDate
						}
					};
				},
				async onQueryStarted({ manPowerDate, passenger }, { queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						// Check if the response is an empty array
						if (Array.isArray(data) && data.length === 0) {
							CustomNotification('error', 'There are no manpower records');
						}
					} catch (error) {
						console.log('Error:', error);
						// CustomNotification('error', error?.error?.response?.data?.detail);
					}
				},
				providesTags: ['bmetApplications']
			})
		}),
		overrideExisting: false
	});
export default BmetApplicationApi;
export const { useGetBmetApplicationsQuery } = BmetApplicationApi;

export const selectFilteredBmetApplications = (bmetApplications) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return bmetApplications;
		}

		return FuseUtils.filterArrayByString(bmetApplications, searchText);
	});
