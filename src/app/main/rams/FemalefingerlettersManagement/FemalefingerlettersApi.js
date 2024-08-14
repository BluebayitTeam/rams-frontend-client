import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['femalefingerletters'];

const FemalefingerletterApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFemalefingerletter: build.query({
				query: (femalefingerletterId) => ({
					url: `${GET_PASSENGER_BY_ID}${femalefingerletterId}`
				}),
				providesTags: ['femalefingerletters'],
				async onQueryStarted(maletrainingId, { queryFulfilled }) {
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

export default FemalefingerletterApi;

export const { useGetFemalefingerletterQuery } = FemalefingerletterApi;

export const selectFilteredFemalefingerletters = (femalefingerletters) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return femalefingerletters;
		}

		return FuseUtils.filterArrayByString(femalefingerletters, searchText);
	});
