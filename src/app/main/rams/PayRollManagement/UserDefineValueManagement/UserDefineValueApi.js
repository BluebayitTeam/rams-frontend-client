import FuseUtils from '@fuse/utils';
import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import {
	CREATE_USERDEFINEVALUE,
	DELETE_USERDEFINEVALUE,
	GET_USERDEFINEVALUEID,
	GET_USERDEFINEVALUES,
	UPDATE_USERDEFINEVALUE
} from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';
import UserDefineValueModel from './userDefineValue/models/UserDefineValueModel';

export const addTagTypes = ['userDefineValues'];
const UserDefineValueApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getUserDefineValues: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_USERDEFINEVALUES, params: { page, size, searchKey } }),
				providesTags: ['userDefineValues']
			}),
			deleteUserDefineValues: build.mutation({
				query: (userDefineValueIds) => ({
					url: DELETE_USERDEFINEVALUE,
					method: 'DELETE',
					data: { ids: userDefineValueIds }
				}),
				invalidatesTags: ['userDefineValues']
			}),
			getUserDefineValue: build.query({
				query: (userDefineValueId) => ({
					url: `${GET_USERDEFINEVALUEID}${userDefineValueId}`
				}),
				providesTags: ['userDefineValues']
			}),
			createUserDefineValue: build.mutation({
				query: (newUserDefineValue) => ({
					url: CREATE_USERDEFINEVALUE,
					method: 'POST',
					data: UserDefineValueModel(newUserDefineValue)
				}),
				invalidatesTags: ['userDefineValues']
			}),
			updateUserDefineValue: build.mutation({
				query: (userDefineValue) => ({
					url: `${UPDATE_USERDEFINEVALUE}${userDefineValue.id}`,
					method: 'PUT',
					data: userDefineValue
				}),
				invalidatesTags: ['userDefineValues']
			}),
			deleteUserDefineValue: build.mutation({
				query: (userDefineValueId) => ({
					url: `${DELETE_USERDEFINEVALUE}${userDefineValueId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['userDefineValues']
			})
		}),
		overrideExisting: false
	});
export default UserDefineValueApi;

export const {
	useGetUserDefineValuesQuery,
	useDeleteUserDefineValuesMutation,
	useGetUserDefineValueQuery,
	useUpdateUserDefineValueMutation,
	useDeleteUserDefineValueMutation,
	useCreateUserDefineValueMutation
} = UserDefineValueApi;

export const selectFilteredUserDefineValues = (userDefineValues) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return userDefineValues;
		}

		return FuseUtils.filterArrayByString(userDefineValues, searchText);
	});
