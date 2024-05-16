import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_OFFICEWORK,
	UPDATE_OFFICEWORK,
	DELETE_OFFICEWORK,
	OFFICEWORK_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import officeWorkModel from './officeWork/models/OfficeWorkModel';

export const addTagTypes = ['medicals'];
const OfficeWorkApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getOfficeWork: build.query({
				query: (officeWorkId) => ({
					url: `${OFFICEWORK_BY_PASSENGER_ID}${officeWorkId}`
				}),
				providesTags: ['officeWorks']
			}),
			createOfficeWork: build.mutation({
				query: (newOfficeWork) => ({
					url: CREATE_OFFICEWORK,
					method: 'POST',
					data: jsonToFormData(officeWorkModel(newOfficeWork))
				}),
				invalidatesTags: ['officeWorks']
			}),
			updateOfficeWork: build.mutation({
				query: (officeWork) => ({
					url: `${UPDATE_OFFICEWORK}${officeWork.id}`,
					method: 'PUT',
					data: jsonToFormData(officeWork)
				}),
				invalidatesTags: ['medicals']
			}),
			deleteOfficeWork: build.mutation({
				query: (medicalId) => ({
					url: `${DELETE_OFFICEWORK}${medicalId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['medicals']
			})
		}),
		overrideExisting: false
	});
export default OfficeWorkApi;
export const {
	useGetOfficeWorksQuery,
	useDeleteOfficeWorksMutation,
	useGetOfficeWorkQuery,
	useUpdateOfficeWorkMutation,
	useDeleteOfficeWorkMutation,
	useCreateOfficeWorkMutation
} = OfficeWorkApi;

export const selectFilteredOfficeWorks = (medicals) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return medicals;
		}

		return FuseUtils.filterArrayByString(medicals, searchText);
	});
