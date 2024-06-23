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

export const addTagTypes = ['callingEmbAttestations'];
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
				providesTags: ['callingEmbAttestations']
			}),
			createCallingEmbAttestation: build.mutation({
				query: (newCallingEmbAttestation) => ({
					url: CREATE_CALLINGEMBATTESTATION,
					method: 'POST',
					data: jsonToFormData(
						CallingEmbAttestationModel({
							...newCallingEmbAttestation
							// interviewed_date:
							// 	moment(new Date(newCallingEmbAttestation?.interviewed_date)).format('YYYY-MM-DD') || '',
							// submitted_for_sev_date:
							// 	moment(new Date(newCallingEmbAttestation?.submitted_for_sev_date)).format(
							// 		'YYYY-MM-DD'
							// 	) || '',
							// sev_received_date:
							// 	moment(new Date(newCallingEmbAttestation?.sev_received_date)).format('YYYY-MM-DD') ||
							// 	'',
							// submitted_for_permission_immigration_clearance_date:
							// 	moment(
							// 		new Date(
							// 			newCallingEmbAttestation?.submitted_for_permission_immigration_clearance_date
							// 		)
							// 	).format('YYYY-MM-DD') || '',
							// immigration_clearance_date:
							// 	moment(new Date(newCallingEmbAttestation?.immigration_clearance_date)).format(
							// 		'YYYY-MM-DD'
							// 	) || '',
							// handover_passport_ticket_date:
							// 	moment(new Date(newCallingEmbAttestation?.handover_passport_ticket_date)).format(
							// 		'YYYY-MM-DD'
							// 	) || '',
							// accounts_cleared_date:
							// 	moment(new Date(newCallingEmbAttestation?.accounts_cleared_date)).format(
							// 		'YYYY-MM-DD'
							// 	) || '',
							// dispatched_date:
							// 	moment(new Date(newCallingEmbAttestation?.dispatched_date)).format('YYYY-MM-DD') || '',
							// repatriation_date:
							// 	moment(new Date(newCallingEmbAttestation?.repatriation_date)).format('YYYY-MM-DD') || ''
						})
					)
				}),
				invalidatesTags: ['callingEmbAttestations']
			}),
			updateCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestation) => ({
					url: `${UPDATE_CALLINGEMBATTESTATION}${callingEmbAttestation.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...callingEmbAttestation
					})
				}),
				invalidatesTags: ['callingEmbAttestations']
			}),
			deleteCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestationId) => ({
					url: `${DELETE_CALLINGEMBATTESTATION}${callingEmbAttestationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['callingEmbAttestations']
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

export const selectFilteredCallingEmbAttestations = (callingEmbAttestations) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return callingEmbAttestations;
		}

		return FuseUtils.filterArrayByString(callingEmbAttestations, searchText);
	});
