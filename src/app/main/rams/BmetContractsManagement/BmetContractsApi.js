import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['bmetContracts'];

const BmetContractApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getBmetContract: build.query({
				query: (bmetContractId) => ({
					url: `${GET_BMET_BY_ID}${bmetContractId}`
				}),
				providesTags: ['bmetContracts'],
				async onQueryStarted(bmetContractId, { queryFulfilled }) {
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

export default BmetContractApi;

export const { useGetBmetContractsQuery, useGetBmetContractQuery } = BmetContractApi;

export const selectFilteredBmetContracts = (bmetContracts) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return bmetContracts;
		}

		return FuseUtils.filterArrayByString(bmetContracts, searchText);
	});
