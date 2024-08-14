import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['malefingerletters'];

const MalefingerletterApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMalefingerletter: build.query({
				query: (malefingerletterId) => ({
					url: `${GET_PASSENGER_BY_ID}${malefingerletterId}`
				}),
				providesTags: ['malefingerletters'],
				async onQueryStarted(malefingerletterId, { queryFulfilled }) {
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

export default MalefingerletterApi;

export const { useGetMalefingerletterQuery } = MalefingerletterApi;

export const selectFilteredMalefingerletters = (malefingerletters) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return malefingerletters;
		}

		return FuseUtils.filterArrayByString(malefingerletters, searchText);
	});
