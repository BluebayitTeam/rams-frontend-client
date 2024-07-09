import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_MULTIPLE,
	GET_DEPARTMENTS,
	GET_DEPARTMENT_BY_ID,
	UPDATE_DEPARTMENT
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MakeAListsManagementModel from './makeAListsManagement/models/MakeAListsManagementModel';

export const addTagTypes = ['makeAListsManagements'];
const MakeAListsManagementApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMakeAListsManagements: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_DEPARTMENTS, params: { page, size, searchKey } }),
				providesTags: ['makeAListsManagements']
			}),
			deleteMakeAListsManagements: build.mutation({
				query: (makeAListsManagementIds) => ({
					url: DELETE_DEPARTMENT_MULTIPLE,
					method: 'DELETE',
					data: { ids: makeAListsManagementIds }
				}),
				invalidatesTags: ['makeAListsManagements']
			}),
			getMakeAListsManagement: build.query({
				query: (makeAListsManagementId) => ({
					url: `${GET_DEPARTMENT_BY_ID}${makeAListsManagementId}`
				}),
				providesTags: ['makeAListsManagements']
			}),
			createMakeAListsManagement: build.mutation({
				query: (newMakeAListsManagement) => ({
					url: CREATE_DEPARTMENT,
					method: 'POST',
					data: jsonToFormData(MakeAListsManagementModel(newMakeAListsManagement))
				}),
				invalidatesTags: ['makeAListsManagements']
			}),
			updateMakeAListsManagement: build.mutation({
				query: (makeAListsManagement) => ({
					url: `${UPDATE_DEPARTMENT}${makeAListsManagement.id}`,
					method: 'PUT',
					data: jsonToFormData(makeAListsManagement)
				}),
				invalidatesTags: ['makeAListsManagements']
			}),
			deleteMakeAListsManagement: build.mutation({
				query: (makeAListsManagementId) => ({
					url: `${DELETE_DEPARTMENT}${makeAListsManagementId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['makeAListsManagements']
			})
		}),
		overrideExisting: false
	});
export default MakeAListsManagementApi;
export const {
	useGetMakeAListsManagementsQuery,
	useDeleteMakeAListsManagementsMutation,
	useGetMakeAListsManagementQuery,
	useUpdateMakeAListsManagementMutation,
	useDeleteMakeAListsManagementMutation,

	useCreateMakeAListsManagementMutation
} = MakeAListsManagementApi;

export const selectFilteredMakeAListsManagements = (makeAListsManagements) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return makeAListsManagements;
		}

		return FuseUtils.filterArrayByString(makeAListsManagements, searchText);
	});
