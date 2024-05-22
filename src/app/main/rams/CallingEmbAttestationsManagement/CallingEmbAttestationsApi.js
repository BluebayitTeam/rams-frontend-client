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

export const addTagTypes = ['medicals'];
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
				providesTags: ['medicals']
			}),
			createCallingEmbAttestation: build.mutation({
				query: (newCallingEmbAttestation) => ({
					url: CREATE_CALLINGEMBATTESTATION,
					method: 'POST',
					data: jsonToFormData(
						CallingEmbAttestationModel({
							...newCallingEmbAttestation,
							medical_exam_date: moment(new Date(newCallingEmbAttestation?.medical_exam_date)).format(
								'YYYY-MM-DD'
							),
							medical_report_date: moment(new Date(newCallingEmbAttestation?.medical_report_date)).format(
								'YYYY-MM-DD'
							),
							medical_issue_date: moment(new Date(newCallingEmbAttestation?.medical_issue_date)).format(
								'YYYY-MM-DD'
							),
							medical_expiry_date: moment(new Date(newCallingEmbAttestation?.medical_expiry_date)).format(
								'YYYY-MM-DD'
							)
						})
					)
				}),
				invalidatesTags: ['medicals']
			}),
			updateCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestation) => ({
					url: `${UPDATE_CALLINGEMBATTESTATION}${callingEmbAttestation.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...callingEmbAttestation,
						medical_exam_date: moment(new Date(callingEmbAttestation?.medical_exam_date)).format(
							'YYYY-MM-DD'
						),
						medical_report_date: moment(new Date(callingEmbAttestation?.medical_report_date)).format(
							'YYYY-MM-DD'
						),
						medical_issue_date: moment(new Date(callingEmbAttestation?.medical_issue_date)).format(
							'YYYY-MM-DD'
						),
						medical_expiry_date: moment(new Date(callingEmbAttestation?.medical_expiry_date)).format(
							'YYYY-MM-DD'
						)
					})
				}),
				invalidatesTags: ['medicals']
			}),
			deleteCallingEmbAttestation: build.mutation({
				query: (callingEmbAttestationId) => ({
					url: `${DELETE_CALLINGEMBATTESTATION}${callingEmbAttestationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['medicals']
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

export const selectFilteredCallingEmbAttestations = (medicals) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return medicals;
		}

		return FuseUtils.filterArrayByString(medicals, searchText);
	});
