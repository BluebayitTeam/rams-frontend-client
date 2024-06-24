import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_GROUP,
	DELETE_GROUP,
	DELETE_GROUP_MULTIPLE,
	GET_GROUPS,
	GET_GROUP_BY_ID,
	UPDATE_GROUP
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import GroupModel from './group/models/GroupModel';

export const addTagTypes = ['groups'];
const GroupApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getGroups: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_GROUPS, params: { page, size, searchKey } }),
				providesTags: ['groups']
			}),
			deleteGroups: build.mutation({
				query: (groupIds) => ({
					url: DELETE_GROUP_MULTIPLE,
					method: 'DELETE',
					data: { ids: groupIds }
				}),
				invalidatesTags: ['groups']
			}),
			getGroup: build.query({
				query: (groupId) => ({
					url: `${GET_GROUP_BY_ID}${groupId}`
				}),
				providesTags: ['groups']
			}),
			createGroup: build.mutation({
				query: (newGroup) => ({
					url: CREATE_GROUP,
					method: 'POST',
					data: jsonToFormData(GroupModel(newGroup))
				}),
				invalidatesTags: ['groups']
			}),
			updateGroup: build.mutation({
				query: (group) => ({
					url: `${UPDATE_GROUP}${group.id}`,
					method: 'PUT',
					data: jsonToFormData(group)
				}),
				invalidatesTags: ['groups']
			}),
			deleteGroup: build.mutation({
				query: (groupId) => ({
					url: `${DELETE_GROUP}${groupId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['groups']
			})
		}),
		overrideExisting: false
	});
export default GroupApi;
export const {
	useGetGroupsQuery,
	useDeleteGroupsMutation,
	useGetGroupQuery,
	useUpdateGroupMutation,
	useDeleteGroupMutation,

	useCreateGroupMutation
} = GroupApi;

export const selectFilteredGroups = (groups) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return groups;
		}

		return FuseUtils.filterArrayByString(groups, searchText);
	});
