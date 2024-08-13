import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['maletrainings'];

const MaletrainingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMaletraining: build.query({
				query: (maletrainingId) => ({
					url: `${GET_PASSENGER_BY_ID}${maletrainingId}`
				}),
				providesTags: ['maletrainings'],
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

export default MaletrainingApi;

export const { useGetMaletrainingQuery } = MaletrainingApi;

export const selectFilteredMaletrainings = (maletrainings) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return maletrainings;
		}

		return FuseUtils.filterArrayByString(maletrainings, searchText);
	});
