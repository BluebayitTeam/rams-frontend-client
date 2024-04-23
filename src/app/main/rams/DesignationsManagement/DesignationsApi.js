import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_DESIGNATION,
	DELETE_DESIGNATION,
	GET_DESIGNATIONS,
	GET_DESIGNATION_BY_ID,
	UPDATE_DESIGNATION
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import DesignationModel from './designation/models/DesignationModel';

export const addTagTypes = ['designations'];
const DesignationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getDesignations: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_DESIGNATIONS, params: { page, size, searchKey } }),
				providesTags: ['designations']
			}),
			deleteDesignations: build.mutation({
				query: (designationIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: designationIds
				}),
				invalidatesTags: ['designations']
			}),
			getDesignation: build.query({
				query: (designationId) => ({
					url: `${GET_DESIGNATION_BY_ID}${designationId}`
				}),
				providesTags: ['designations']
			}),
			createDesignation: build.mutation({
				query: (newDesignation) => ({
					url: CREATE_DESIGNATION,
					method: 'POST',
					data: jsonToFormData(DesignationModel(newDesignation))
				}),
				invalidatesTags: ['designations']
			}),
			updateDesignation: build.mutation({
				query: (designation) => ({
					url: `${UPDATE_DESIGNATION}${designation.id}`,
					method: 'PUT',
					data: jsonToFormData(designation)
				}),
				invalidatesTags: ['designations']
			}),
			deleteDesignation: build.mutation({
				query: (designationId) => ({
					url: `${DELETE_DESIGNATION}${designationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['designations']
			})
		}),
		overrideExisting: false
	});
export default DesignationApi;
export const {
	useGetDesignationsQuery,
	useDeleteDesignationsMutation,
	useGetDesignationQuery,
	useUpdateDesignationMutation,
	useDeleteDesignationMutation,

	useCreateDesignationMutation
} = DesignationApi;

export const selectFilteredDesignations = (designations) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return designations;
		}

		return FuseUtils.filterArrayByString(designations, searchText);
	});
