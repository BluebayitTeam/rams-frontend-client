import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['thailandVisas'];

const ThailandVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getThailandVisa: build.query({
				query: (thailandVisaId) => ({
					url: `${GET_BMET_BY_ID}${thailandVisaId}`
				}),
				providesTags: ['thailandVisas'],
				async onQueryStarted(thailandVisaId, { queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						console.log('vjlkldfg', error);
						CustomNotification('error', `${error?.error?.response?.data?.detail}`);
					}
				}
			})
		}),
		overrideExisting: false
	});

export default ThailandVisaApi;

export const { useGetThailandVisasQuery, useGetThailandVisaQuery } = ThailandVisaApi;

export const selectFilteredThailandVisas = (thailandVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return thailandVisas;
		}

		return FuseUtils.filterArrayByString(thailandVisas, searchText);
	});
