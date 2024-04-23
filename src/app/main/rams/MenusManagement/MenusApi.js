import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, CREATE_MENU, DELETE_MENU, GET_MENUS, GET_MENUS_ALL, UPDATE_MENU } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MenuModel from './menu/models/MenuModel';

export const addTagTypes = ['menus'];
const MenuApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMenus: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_MENUS_ALL, params: { page, size, searchKey } }),
				providesTags: ['menus']
			}),
			deleteMenus: build.mutation({
				query: (menuIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: menuIds
				}),
				invalidatesTags: ['menus']
			}),
			getMenu: build.query({
				query: (menuId) => ({
					url: `${GET_MENUS}${menuId}`
				}),
				providesTags: ['menus']
			}),
			createMenu: build.mutation({
				query: (newMenu) => ({
					url: CREATE_MENU,
					method: 'POST',
					data: jsonToFormData(MenuModel(newMenu))
				}),
				invalidatesTags: ['menus']
			}),
			updateMenu: build.mutation({
				query: (menu) => ({
					url: `${UPDATE_MENU}${menu.id}`,
					method: 'PUT',
					data: jsonToFormData(menu)
				}),
				invalidatesTags: ['menus']
			}),
			deleteMenu: build.mutation({
				query: (menuId) => ({
					url: `${DELETE_MENU}${menuId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['menus']
			})
		}),
		overrideExisting: false
	});
export default MenuApi;
export const {
	useGetMenusQuery,
	useDeleteMenusMutation,
	useGetMenuQuery,
	useUpdateMenuMutation,
	useDeleteMenuMutation,

	useCreateMenuMutation
} = MenuApi;

export const selectFilteredMenus = (menus) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return menus;
		}

		return FuseUtils.filterArrayByString(menus, searchText);
	});
