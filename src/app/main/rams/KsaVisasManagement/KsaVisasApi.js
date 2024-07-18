import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { GET_KSAVISA_BY_ID } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import KsaVisaModel from './ksaVisa/models/KsaVisaModel';

export const addTagTypes = ['ksaVisas'];
const KsaVisaApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getKsaVisa: build.mutation({
				query: (newKsaVisa) => ({
					url: GET_KSAVISA_BY_ID,
					method: 'PUT',
					data: KsaVisaModel({
						visa_entry: newKsaVisa?.visa_entry,
						status: newKsaVisa?.current_status,
						passengers: newKsaVisa?.passengers
					})
				}),
				invalidatesTags: ['ksaVisas']
			})
		}),
		overrideExisting: false
	});
export default KsaVisaApi;
export const { useCreateKsaVisaMutation } = KsaVisaApi;

export const selectFilteredKsaVisas = (ksaVisas) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return ksaVisas;
		}

		return FuseUtils.filterArrayByString(ksaVisas, searchText);
	});
