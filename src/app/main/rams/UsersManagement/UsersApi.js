import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, USERS_PASSWORDCHANGE } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['users'];
const UserApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getUsers: build.query({
				query: ({ page, size, searchKey }) => ({ url: ALL_USERS, params: { page, size, searchKey } }),
				providesTags: ['users']
			}),

			updateUser: build.mutation({
				query: (user) => ({
					url: `${USERS_PASSWORDCHANGE}${user.id}`,
					method: 'PATCH',
					data: user
				}),
				invalidatesTags: ['users']
			})
		}),
		overrideExisting: false
	});
export default UserApi;
export const { useGetUsersQuery, useUpdateUserMutation } = UserApi;

export const selectFilteredUsers = (users) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return users;
		}

		return FuseUtils.filterArrayByString(users, searchText);
	});
