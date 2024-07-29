// import { apiService as api } from 'app/store/apiService';
// import { createSelector } from '@reduxjs/toolkit';
// import FuseUtils from '@fuse/utils';
// import { GET_KSAVISA_BY_ID, GET_KSAVISAS } from 'src/app/constant/constants';
// import { selectSearchText } from './store/searchTextSlice';

// export const addTagTypes = ['malaysiaVisas'];
// const MalaysiaVisaApi = api
// 	.enhanceEndpoints({
// 		addTagTypes
// 	})
// 	.injectEndpoints({
// 		endpoints: (build) => ({
// 			getMalaysiaVisas: build.query({
// 				query: ({ id }) => ({ url: GET_KSAVISAS, params: { id } }),
// 				providesTags: ['malaysiaVisas']
// 			}),

// 			getMalaysiaVisa: build.query({
// 				query: (malaysiaVisaId) => ({
// 					url: `${GET_KSAVISA_BY_ID}${malaysiaVisaId}`
// 				}),
// 				providesTags: ['malaysiaVisas']
// 			})
// 		}),
// 		overrideExisting: false
// 	});
// export default MalaysiaVisaApi;
// export const {
// 	useGetMalaysiaVisasQuery,

// 	useGetMalaysiaVisaQuery
// } = MalaysiaVisaApi;

// export const selectFilteredMalaysiaVisas = (malaysiaVisas) =>
// 	createSelector([selectSearchText], (searchText) => {
// 		if (searchText?.length === 0) {
// 			return malaysiaVisas;
// 		}

// 		return FuseUtils.filterArrayByString(malaysiaVisas, searchText);
// 	});

import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_BMET_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['malaysiaVisas'];

const MalaysiaVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMalaysiaVisa: build.query({
				query: (malaysiaVisaId) => ({
					url: `${GET_BMET_BY_ID}${malaysiaVisaId}`
				}),
				providesTags: ['malaysiaVisas'],
				async onQueryStarted(malaysiaVisaId, { queryFulfilled }) {
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

export default MalaysiaVisaApi;

export const { useGetMalaysiaVisasQuery, useGetMalaysiaVisaQuery } = MalaysiaVisaApi;

export const selectFilteredMalaysiaVisas = (malaysiaVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return malaysiaVisas;
		}

		return FuseUtils.filterArrayByString(malaysiaVisas, searchText);
	});
