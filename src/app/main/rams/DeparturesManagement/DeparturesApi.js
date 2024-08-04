import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_DEPARTURE_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['departures'];

const DepartureApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDeparture: build.query({
				query: (departureId) => ({
					url: `${GET_DEPARTURE_BY_ID}${departureId}`
				}),
				providesTags: ['departures'],
				async onQueryStarted(departureId, { queryFulfilled }) {
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

export default DepartureApi;

export const { useGetDeparturesQuery, useGetDepartureQuery } = DepartureApi;

export const selectFilteredDepartures = (departures) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return departures;
		}

		return FuseUtils.filterArrayByString(departures, searchText);
	});
