import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	ALL_USERS,
	CREATE_ROLEMENU,
	DELETE_ROLEMENU,
	GET_ROLEMENUS,
	GET_ROLEMENU_BY_ID
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import RoleMenuModel from './roleMenu/models/RoleMenuModel';

export const addTagTypes = ['roleMenus'];
const RoleMenuApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getRoleMenus: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_ROLEMENUS, params: { page, size, searchKey } }),
				providesTags: ['roleMenus']
			}),
			deleteRoleMenus: build.mutation({
				query: (roleMenuIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: roleMenuIds
				}),
				invalidatesTags: ['roleMenus']
			}),
			getRoleMenu: build.query({
				query: (roleMenuId) => ({
					url: `${GET_ROLEMENU_BY_ID}${roleMenuId}`
				}),
				providesTags: ['roleMenus']
			}),
			createRoleMenu: build.mutation({
				query: (newRoleMenu) => ({
					url: CREATE_ROLEMENU,
					method: 'POST',
					data: RoleMenuModel(newRoleMenu)
				}),
				invalidatesTags: ['roleMenus']
			}),
			updateRoleMenu: build.mutation({
				query: (roleMenu) => ({
					url: `${CREATE_ROLEMENU}`,
					method: 'POST',
					data: roleMenu
				}),
				invalidatesTags: ['roleMenus']
			}),
			deleteRoleMenu: build.mutation({
				query: (roleMenuId) => ({
					url: `${DELETE_ROLEMENU}${roleMenuId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['roleMenus']
			})
		}),
		overrideExisting: false
	});
export default RoleMenuApi;
export const {
	useGetRoleMenusQuery,
	useDeleteRoleMenusMutation,
	useGetRoleMenuQuery,
	useUpdateRoleMenuMutation,
	useDeleteRoleMenuMutation,

	useCreateRoleMenuMutation
} = RoleMenuApi;

export const selectFilteredRoleMenus = (roleMenus) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return roleMenus;
		}

		return FuseUtils.filterArrayByString(roleMenus, searchText);
	});
