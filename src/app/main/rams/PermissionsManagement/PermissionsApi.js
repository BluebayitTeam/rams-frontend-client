import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_PERMISSION,
	DELETE_PERMISSION,
	GET_PERMISSIONS,
	GET_PERMISSION_BY_ID,
	UPDATE_PERMISSION
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import PermissionModel from './permission/models/PermissionModel';

export const addTagTypes = ['permissions'];
const PermissionApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPermissions: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_PERMISSIONS, params: { page, size, searchKey } }),
				providesTags: ['permissions']
			}),
			deletePermissions: build.mutation({
				query: (permissionIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: permissionIds
				}),
				invalidatesTags: ['permissions']
			}),
			getPermission: build.query({
				query: (permissionId) => ({
					url: `${GET_PERMISSION_BY_ID}${permissionId}`
				}),
				providesTags: ['permissions']
			}),
			createPermission: build.mutation({
				query: (newPermission) => ({
					url: CREATE_PERMISSION,
					method: 'POST',
					data: jsonToFormData(PermissionModel(newPermission))
				}),
				invalidatesTags: ['permissions']
			}),
			updatePermission: build.mutation({
				query: (permission) => ({
					url: `${UPDATE_PERMISSION}${permission.id}`,
					method: 'PUT',
					data: jsonToFormData(permission)
				}),
				invalidatesTags: ['permissions']
			}),
			deletePermission: build.mutation({
				query: (permissionId) => ({
					url: `${DELETE_PERMISSION}${permissionId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['permissions']
			})
		}),
		overrideExisting: false
	});
export default PermissionApi;
export const {
	useGetPermissionsQuery,
	useDeletePermissionsMutation,
	useGetPermissionQuery,
	useUpdatePermissionMutation,
	useDeletePermissionMutation,

	useCreatePermissionMutation
} = PermissionApi;

export const selectFilteredPermissions = (permissions) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return permissions;
		}

		return FuseUtils.filterArrayByString(permissions, searchText);
	});
