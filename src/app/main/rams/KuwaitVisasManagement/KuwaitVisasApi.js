import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['kuwaitVisas'];

const KuwaitVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getKuwaitVisa: build.query({
				query: (kuwaitVisaId) => ({
					url: `${GET_BMET_BY_ID}${kuwaitVisaId}`
				}),
				providesTags: ['kuwaitVisas'],
				async onQueryStarted(kuwaitVisaId, { queryFulfilled }) {
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

export default KuwaitVisaApi;

export const { useGetKuwaitVisasQuery, useGetKuwaitVisaQuery } = KuwaitVisaApi;

export const selectFilteredKuwaitVisas = (kuwaitVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return kuwaitVisas;
		}

		return FuseUtils.filterArrayByString(kuwaitVisas, searchText);
	});
