import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { MEDICAL_BY_PASSENGER_ID, CREATE_MEDICAL, UPDATE_MEDICAL, DELETE_MEDICAL } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import moment from 'moment';
import { selectSearchText } from './store/searchTextSlice';
import MedicalModel from './medical/models/MedicalModel';

export const addTagTypes = ['medicals'];
const MedicalApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// getMedicals: build.query({
			// 	query: ({ page, size, searchKey }) => ({
			// 		url: GET_VISAENTRYS,
			// 		params: { page, size, searchKey }
			// 	}),
			// 	providesTags: ['medicals']
			// }),
			// deleteMedicals: build.mutation({
			// 	query: (medicalIds) => ({
			// 		url: ALL_USERS,
			// 		method: 'DELETE',
			// 		data: medicalIds
			// 	}),
			// 	invalidatesTags: ['medicals']
			// }),
			getMedical: build.query({
				query: (medicalId) => ({
					url: `${MEDICAL_BY_PASSENGER_ID}${medicalId}`
				}),
				providesTags: ['medicals']
			}),
			createMedical: build.mutation({
				query: (newMedical) => ({
					url: CREATE_MEDICAL,
					method: 'POST',
					data: jsonToFormData(
						MedicalModel({
							...newMedical,
							medical_exam_date: moment(new Date(newMedical?.medical_exam_date)).format('YYYY-MM-DD'),
							medical_report_date: moment(new Date(newMedical?.medical_report_date)).format('YYYY-MM-DD'),
							medical_issue_date: moment(new Date(newMedical?.medical_issue_date)).format('YYYY-MM-DD')
							// medical_expiry_date: moment(new Date(newMedical?.medical_expiry_date)).format('YYYY-MM-DD')
						})
					)
				}),
				invalidatesTags: ['medicals']
			}),
			updateMedical: build.mutation({
				query: (medical) => ({
					url: `${UPDATE_MEDICAL}${medical.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...medical,
						medical_exam_date: moment(new Date(medical?.medical_exam_date)).format('YYYY-MM-DD'),
						medical_report_date: moment(new Date(medical?.medical_report_date)).format('YYYY-MM-DD'),
						medical_issue_date: moment(new Date(medical?.medical_issue_date)).format('YYYY-MM-DD')
						// medical_expiry_date: moment(new Date(medical?.medical_expiry_date)).format('YYYY-MM-DD')
					})
				}),
				invalidatesTags: ['medicals']
			}),
			deleteMedical: build.mutation({
				query: (medicalId) => ({
					url: `${DELETE_MEDICAL}${medicalId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['medicals']
			})
		}),
		overrideExisting: false
	});
export default MedicalApi;
export const {
	useGetMedicalsQuery,
	useDeleteMedicalsMutation,
	useGetMedicalQuery,
	useUpdateMedicalMutation,
	useDeleteMedicalMutation,
	useCreateMedicalMutation
} = MedicalApi;

export const selectFilteredMedicals = (medicals) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return medicals;
		}

		return FuseUtils.filterArrayByString(medicals, searchText);
	});
