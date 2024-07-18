import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_KSAVISA_BY_ID, GET_KSAVISAS } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ksaVisas'];
const KsaVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getKsaVisas: build.query({
				query: ({ id }) => ({ url: GET_KSAVISAS, params: { id } }),
				providesTags: ['ksaVisas']
			}),

			getKsaVisa: build.query({
				query: (ksaVisaId) => ({
					url: `${GET_KSAVISA_BY_ID}${ksaVisaId}`
				}),
				providesTags: ['ksaVisas']
			})
		}),
		overrideExisting: false
	});
export default KsaVisaApi;
export const {
	useGetKsaVisasQuery,

	useGetKsaVisaQuery
} = KsaVisaApi;

export const selectFilteredKsaVisas = (ksaVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ksaVisas;
		}

		return FuseUtils.filterArrayByString(ksaVisas, searchText);
	});
