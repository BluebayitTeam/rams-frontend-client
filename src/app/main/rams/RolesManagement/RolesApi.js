import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, CREATE_ROLE, DELETE_ROLE, GET_ROLE, GET_ROLES, UPDATE_ROLE } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import RoleModel from './role/models/RoleModel';

export const addTagTypes = ['roles'];
const RoleApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getRoles: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_ROLES, params: { page, size, searchKey } }),
				providesTags: ['roles']
			}),
			deleteRoles: build.mutation({
				query: (roleIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: roleIds
				}),
				invalidatesTags: ['roles']
			}),
			getRole: build.query({
				query: (roleId) => ({
					url: `${GET_ROLE}${roleId}`
				}),
				providesTags: ['roles']
			}),
			createRole: build.mutation({
				query: (newRole) => ({
					url: CREATE_ROLE,
					method: 'POST',
					data: jsonToFormData(RoleModel(newRole))
				}),
				invalidatesTags: ['roles']
			}),
			updateRole: build.mutation({
				query: (role) => ({
					url: `${UPDATE_ROLE}${role.id}`,
					method: 'PUT',
					data: jsonToFormData(role)
				}),
				invalidatesTags: ['roles']
			}),
			deleteRole: build.mutation({
				query: (roleId) => ({
					url: `${DELETE_ROLE}${roleId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['roles']
			})
		}),
		overrideExisting: false
	});
export default RoleApi;
export const {
	useGetRolesQuery,
	useDeleteRolesMutation,
	useGetRoleQuery,
	useUpdateRoleMutation,
	useDeleteRoleMutation,

	useCreateRoleMutation
} = RoleApi;

export const selectFilteredRoles = (roles) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return roles;
		}

		return FuseUtils.filterArrayByString(roles, searchText);
	});
