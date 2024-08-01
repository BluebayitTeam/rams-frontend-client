import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_PASSENGER_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['passengerAgreements'];

const PassengerAgreementApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPassengerAgreement: build.query({
				query: (passengerAgreementId) => ({
					url: `${GET_PASSENGER_BY_ID}${passengerAgreementId}`
				}),
				providesTags: ['passengerAgreements'],
				async onQueryStarted(passengerAgreementId, { queryFulfilled }) {
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

export default PassengerAgreementApi;

export const { useGetPassengerAgreementQuery } = PassengerAgreementApi;

export const selectFilteredPassengerAgreements = (passengerAgreements) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return passengerAgreements;
		}

		return FuseUtils.filterArrayByString(passengerAgreements, searchText);
	});
