import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MEDICALCENTER,
	DELETE_MEDICALCENTER,
	DELETE_MEDICALCENTER_MULTIPLE,
	GET_MEDICALCENTERS,
	GET_MEDICALCENTER_BY_ID,
	UPDATE_MEDICALCENTER
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MedicalCenterModel from './medicalCenter/models/MedicalCenterModel';

export const addTagTypes = ['medicalCenters'];
const MedicalCenterApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMedicalCenters: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_MEDICALCENTERS, params: { page, size, searchKey } }),
				providesTags: ['medicalCenters']
			}),
			deleteMedicalCenters: build.mutation({
				query: (medicalCenterIds) => ({
					url: DELETE_MEDICALCENTER_MULTIPLE,
					method: 'DELETE',
					data: { ids: medicalCenterIds }
				}),
				invalidatesTags: ['medicalCenters']
			}),
			getMedicalCenter: build.query({
				query: (medicalCenterId) => ({
					url: `${GET_MEDICALCENTER_BY_ID}${medicalCenterId}`
				}),
				providesTags: ['medicalCenters']
			}),
			createMedicalCenter: build.mutation({
				query: (newMedicalCenter) => ({
					url: CREATE_MEDICALCENTER,
					method: 'POST',
					data: jsonToFormData(MedicalCenterModel(newMedicalCenter))
				}),
				invalidatesTags: ['medicalCenters']
			}),
			updateMedicalCenter: build.mutation({
				query: (medicalCenter) => ({
					url: `${UPDATE_MEDICALCENTER}${medicalCenter.id}`,
					method: 'PUT',
					data: jsonToFormData(medicalCenter)
				}),
				invalidatesTags: ['medicalCenters']
			}),
			deleteMedicalCenter: build.mutation({
				query: (medicalCenterId) => ({
					url: `${DELETE_MEDICALCENTER}${medicalCenterId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['medicalCenters']
			})
		}),
		overrideExisting: false
	});
export default MedicalCenterApi;
export const {
	useGetMedicalCentersQuery,
	useDeleteMedicalCentersMutation,
	useGetMedicalCenterQuery,
	useUpdateMedicalCenterMutation,
	useDeleteMedicalCenterMutation,

	useCreateMedicalCenterMutation
} = MedicalCenterApi;

export const selectFilteredMedicalCenters = (medicalCenters) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return medicalCenters;
		}

		return FuseUtils.filterArrayByString(medicalCenters, searchText);
	});
