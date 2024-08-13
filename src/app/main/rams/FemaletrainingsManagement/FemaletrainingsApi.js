import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['femaletrainings'];

const FemaletrainingApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFemaletraining: build.query({
				query: (femaletrainingId) => ({
					url: `${GET_PASSENGER_BY_ID}${femaletrainingId}`
				}),
				providesTags: ['femaletrainings'],
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

export default FemaletrainingApi;

export const { useGetFemaletrainingQuery } = FemaletrainingApi;

export const selectFilteredFemaletrainings = (femaletrainings) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return femaletrainings;
		}

		return FuseUtils.filterArrayByString(femaletrainings, searchText);
	});
