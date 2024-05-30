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
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import CallingEmbAttestationModel from './callingEmbAttestation/models/CallingEmbAttestationModel';

export const addTagTypes = ['CallingEmbAttestations'];
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
				providesTags: ['CallingEmbAttestations']
			}),
			createCallingEmbAttestation: build.mutation({
				query: (newCallingEmbAttestation) => ({
					url: CREATE_CALLINGEMBATTESTATION,
					method: 'POST',
					data: jsonToFormData(
						CallingEmbAttestationModel({
							...newCallingEmbAttestation,
							interviewed_date: newCallingEmbAttestation?.interviewed_date
								? moment(new Date(newCallingEmbAttestation?.interviewed_date)).format('YYYY-MM-DD')
								: null,
							submitted_for_sev_date: newCallingEmbAttestation?.submitted_for_sev_date
								? moment(new Date(newCallingEmbAttestation?.submitted_for_sev_date)).format(
										'YYYY-MM-DD'
									)
								: null,
							sev_received_date: newCallingEmbAttestation?.sev_received_date
								? moment(new Date(newCallingEmbAttestation?.sev_received_date)).format('YYYY-MM-DD')
								: null,
							submitted_for_permission_immigration_clearance_date:
								newCallingEmbAttestation?.submitted_for_permission_immigration_clearance_date
									? moment(
											new Date(
												newCallingEmbAttestation?.submitted_for_permission_immigration_clearance_date
											)
										).format('YYYY-MM-DD')
									: null,
							immigration_clearance_date: newCallingEmbAttestation?.immigration_clearance_date
								? moment(new Date(newCallingEmbAttestation?.immigration_clearance_date)).format(
										'YYYY-MM-DD'
									)
								: null,
							accounts_cleared_date: newCallingEmbAttestation?.accounts_cleared_date
								? moment(new Date(newCallingEmbAttestation?.accounts_cleared_date)).format('YYYY-MM-DD')
								: null,
							dispatched_date: newCallingEmbAttestation?.dispatched_date
								? moment(new Date(newCallingEmbAttestation?.dispatched_date)).format('YYYY-MM-DD')
								: null,
							handover_passport_ticket_date: newCallingEmbAttestation?.handover_passport_ticket_date
								? moment(new Date(newCallingEmbAttestation?.handover_passport_ticket_date)).format(
										'YYYY-MM-DD'
									)
								: null,
							repatriation_date: newCallingEmbAttestation?.repatriation_date
								? moment(new Date(newCallingEmbAttestation?.repatriation_date)).format('YYYY-MM-DD')
								: null
						})
					)
				}),
				invalidatesTags: ['CallingEmbAttestations']
			}),
			updateCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestation) => ({
					url: `${UPDATE_CALLINGEMBATTESTATION}${callingEmbAttestation.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...callingEmbAttestation,
						interviewed_date: callingEmbAttestation?.interviewed_date
							? moment(new Date(callingEmbAttestation?.interviewed_date)).format('YYYY-MM-DD')
							: null,
						submitted_for_sev_date: callingEmbAttestation?.submitted_for_sev_date
							? moment(new Date(callingEmbAttestation?.submitted_for_sev_date)).format('YYYY-MM-DD')
							: null,
						sev_received_date: callingEmbAttestation?.sev_received_date
							? moment(new Date(callingEmbAttestation?.sev_received_date)).format('YYYY-MM-DD')
							: null,
						submitted_for_permission_immigration_clearance_date:
							callingEmbAttestation?.submitted_for_permission_immigration_clearance_date
								? moment(
										new Date(
											callingEmbAttestation?.submitted_for_permission_immigration_clearance_date
										)
									).format('YYYY-MM-DD')
								: null,
						immigration_clearance_date: callingEmbAttestation?.immigration_clearance_date
							? moment(new Date(callingEmbAttestation?.immigration_clearance_date)).format('YYYY-MM-DD')
							: null,
						accounts_cleared_date: callingEmbAttestation?.accounts_cleared_date
							? moment(new Date(callingEmbAttestation?.accounts_cleared_date)).format('YYYY-MM-DD')
							: null,
						dispatched_date: callingEmbAttestation?.dispatched_date
							? moment(new Date(callingEmbAttestation?.dispatched_date)).format('YYYY-MM-DD')
							: null,
						handover_passport_ticket_date: callingEmbAttestation?.handover_passport_ticket_date
							? moment(new Date(callingEmbAttestation?.handover_passport_ticket_date)).format(
									'YYYY-MM-DD'
								)
							: null,
						repatriation_date: callingEmbAttestation?.repatriation_date
							? moment(new Date(callingEmbAttestation?.repatriation_date)).format('YYYY-MM-DD')
							: null
					})
				}),
				invalidatesTags: ['CallingEmbAttestations']
			}),
			deleteCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestationId) => ({
					url: `${DELETE_CALLINGEMBATTESTATION}${callingEmbAttestationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['CallingEmbAttestations']
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

export const selectFilteredCallingEmbAttestations = (CallingEmbAttestations) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return CallingEmbAttestations;
		}

		return FuseUtils.filterArrayByString(CallingEmbAttestations, searchText);
	});
