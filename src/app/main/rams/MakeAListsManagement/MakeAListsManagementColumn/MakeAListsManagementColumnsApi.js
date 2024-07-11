import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { ALL_USERS, GET_MAKEALIST_CLM_BY_LIST_ID, UPDATE_MAKEALIST_CLM } from 'src/app/constant/constants';
import { selectSearchText } from './store/searchTextSlice';

export const addTagTypes = ['makeAListsManagementColumns'];
const MakeAListsManagementColumnApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			// getMakeAListsManagementColumns: build.query({
			// 	query: () => ({ url: GET_MAKEALIST_CLM_BY_LIST_ID }),
			// 	providesTags: ['makeAListsManagementColumns']
			// }),

			deleteMakeAListsManagementColumns: build.mutation({
				query: (makeAListsManagementColumnIds) => ({
					url: ALL_USERS,
					method: 'DELETE',
					data: makeAListsManagementColumnIds
				}),
				invalidatesTags: ['makeAListsManagementColumns']
			}),

			getMakeAListsManagementColumn: build.query({
				query: (makeAListsManagementColumnId) => ({
					url: `${GET_MAKEALIST_CLM_BY_LIST_ID}${makeAListsManagementColumnId}`
				}),
				providesTags: ['makeAListsManagementColumns']
			}),
			updateMakeAListsManagementColumn: build.mutation({
				query: (data) => ({
					url: `${UPDATE_MAKEALIST_CLM}${data?.type}/`,
					method: 'PUT',
					data
				}),

				invalidatesTags: ['makeAListsManagementColumns']
			})
			// createMakeAListsManagementColumn: build.mutation({
			// 	query: (newMakeAListsManagementColumn) => ({
			// 		url: CREATE_CLIENT,
			// 		method: 'POST',
			// 		data: jsonToFormData(MakeAListsManagementColumnModel(newMakeAListsManagementColumn))
			// 	}),
			// 	invalidatesTags: ['makeAListsManagementColumns']
			// })
		}),
		overrideExisting: false
	});
export default MakeAListsManagementColumnApi;
export const {
	useGetMakeAListsManagementColumnsQuery,
	useDeleteMakeAListsManagementColumnsMutation,
	useGetMakeAListsManagementColumnQuery,
	useUpdateMakeAListsManagementColumnMutation,
	useDeleteMakeAListsManagementColumnMutation,
	useCreateMakeAListsManagementColumnMutation
} = MakeAListsManagementColumnApi;

export const selectFilteredMakeAListsManagementColumns = (makeAListsManagementColumns) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return makeAListsManagementColumns;
		}

		return FuseUtils.filterArrayByString(makeAListsManagementColumns, searchText);
	});
