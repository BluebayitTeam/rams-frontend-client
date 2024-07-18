import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_KSAVISA_BY_ID } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['ksaVisas'];
const KsaVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getKsaVisa: build.query({
				query: (newKsaVisa) => ({
					url: `${GET_KSAVISA_BY_ID}${newKsaVisa.id}`
				}),
				providesTags: ['ksaVisas']
			})
		}),
		overrideExisting: false
	});
export default KsaVisaApi;
export const { useGetKsaVisaMutation } = KsaVisaApi;

export const selectFilteredKsaVisas = (ksaVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ksaVisas;
		}

		return FuseUtils.filterArrayByString(ksaVisas, searchText);
	});
