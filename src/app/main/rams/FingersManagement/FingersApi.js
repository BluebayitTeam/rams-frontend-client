import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_FINGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['fingers'];

const FingerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFinger: build.query({
				query: (fingerId) => ({
					url: `${GET_FINGER_BY_ID}${fingerId}`
				}),
				providesTags: ['fingers'],
				async onQueryStarted(fingerId, { queryFulfilled }) {
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

export default FingerApi;

export const { useGetFingersQuery, useGetFingerQuery } = FingerApi;

export const selectFilteredFingers = (fingers) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return fingers;
		}

		return FuseUtils.filterArrayByString(fingers, searchText);
	});
