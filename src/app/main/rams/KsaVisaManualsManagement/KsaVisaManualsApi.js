import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_KSAVISA_MANUALS, GET_KSAVISA_BY_ID } from 'src/app/constant/constants';
import { CustomNotification } from 'src/app/@customHooks/notificationAlert';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import KsaVisaManualModel from './ksaVisaManual/models/KsaVisaManualModel';

export const addTagTypes = ['ksaVisaManuals'];

const KsaVisaManualApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getKsaVisaManual: build.query({
				query: (ksaVisaManualId) => ({
					url: `${GET_KSAVISA_BY_ID}${ksaVisaManualId}`
				}),
				providesTags: ['ksaVisaManuals'],
				async onQueryStarted(ksaVisaManualId, { queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						CustomNotification('error', `${error?.error?.response?.data?.detail}`);
					}
				}
			}),

			createKvisaMauals: build.mutation({
				query: (newKvisaMauals) => ({
					url: CREATE_KSAVISA_MANUALS,
					method: 'POST',
					data: jsonToFormData(KsaVisaManualModel(newKvisaMauals.id))
				}),
				invalidatesTags: ['ksaVisaManuals']
			})
		}),
		overrideExisting: false
	});

export default KsaVisaManualApi;

export const { useCreateKvisaMaualsMutation, useGetKsaVisaManualQuery } = KsaVisaManualApi;

export const selectFilteredKsaVisaManuals = (ksaVisaManuals) =>
	createSelector([selectSearchText], (searchText) => {
		if (!searchText || searchText.length === 0) {
			return ksaVisaManuals;
		}

		return FuseUtils.filterArrayByString(ksaVisaManuals, searchText);
	});
