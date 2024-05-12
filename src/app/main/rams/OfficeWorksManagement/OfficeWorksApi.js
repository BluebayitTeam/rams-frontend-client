import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	OFFICEWORK_BY_PASSENGER_ID,
	CREATE_OFFICEWORK,
	UPDATE_OFFICEWORK,
	DELETE_OFFICEWORK
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import OfficeWorkModel from './officeWork/models/OfficeWorkModel';

export const addTagTypes = ['officeWorks'];
const OfficeWorkApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// getOfficeWorks: build.query({
			// 	query: ({ page, size, searchKey }) => ({
			// 		url: GET_DEMANDS,
			// 		params: { page, size, searchKey }
			// 	}),
			// 	providesTags: ['officeWorks']
			// }),
			deleteOfficeWorks: build.mutation({
				query: (officeWorkIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: officeWorkIds
				}),
				invalidatesTags: ['officeWorks']
			}),
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
					data: jsonToFormData(OfficeWorkModel(newOfficeWork))
				}),
				invalidatesTags: ['officeWorks']
			}),
			updateOfficeWork: build.mutation({
				query: (officeWork) => ({
					url: `${UPDATE_OFFICEWORK}${officeWork.id}`,
					method: 'PUT',
					data: jsonToFormData(officeWork)
				}),
				invalidatesTags: ['officeWorks']
			}),
			deleteOfficeWork: build.mutation({
				query: (officeWorkId) => ({
					url: `${DELETE_OFFICEWORK}${officeWorkId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['officeWorks']
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

export const selectFilteredOfficeWorks = (officeWorks) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return officeWorks;
		}

		return FuseUtils.filterArrayByString(officeWorks, searchText);
	});
