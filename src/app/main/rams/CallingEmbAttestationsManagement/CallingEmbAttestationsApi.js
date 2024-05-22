import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_CALLINGEMBATTESTATION,
	UPDATE_CALLINGEMBATTESTATION,
	DELETE_CALLINGEMBATTESTATION,
	CALLINGEMBATTESTATION_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import CallingEmbAttestationModel from './callingEmbAttestation/models/CallingEmbAttestationModel';

export const addTagTypes = ['callingEmbAttestation'];
const CallingEmbAttestationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCallingEmbAttestation: build.query({
				query: (callingEmbAttestationId) => ({
					url: `${CALLINGEMBATTESTATION_BY_PASSENGER_ID}${callingEmbAttestationId}`
				}),
				providesTags: ['callingEmbAttestation']
			}),
			createCallingEmbAttestation: build.mutation({
				query: (newCallingEmbAttestation) => ({
					url: CREATE_CALLINGEMBATTESTATION,
					method: 'POST',
					data: jsonToFormData(
						CallingEmbAttestationModel({
							...newCallingEmbAttestation
						})
					)
				}),
				invalidatesTags: ['callingEmbAttestation']
			}),
			updateCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestation) => ({
					url: `${UPDATE_CALLINGEMBATTESTATION}${callingEmbAttestation.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...callingEmbAttestation
					})
				}),
				invalidatesTags: ['callingEmbAttestation']
			}),
			deleteCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestationId) => ({
					url: `${DELETE_CALLINGEMBATTESTATION}${callingEmbAttestationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['callingEmbAttestation']
			})
		}),
		overrideExisting: false
	});
export default CallingEmbAttestationApi;
export const {
	useGetCallingEmbAttestationsQuery,
	useDeleteCallingEmbAttestationsMutation,
	useGetCallingEmbAttestationQuery,
	useUpdateCallingEmbAttestationMutation,
	useDeleteCallingEmbAttestationMutation,
	useCreateCallingEmbAttestationMutation
} = CallingEmbAttestationApi;

export const selectFilteredCallingEmbAttestations = (callingEmbAttestation) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingEmbAttestation;
		}

		return FuseUtils.filterArrayByString(callingEmbAttestation, searchText);
	});
