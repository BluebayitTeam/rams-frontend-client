import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MAKEALIST,
	DELETE_MAKEALIST,
	DELETE_MAKEALIST_MULTIPLE,
	GET_MAKEALIST_BY_ID,
	GET_MAKEALISTS,
	UPDATE_MAKEALIST
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MakeAListModel from './makeAList/models/MakeAListModel';

export const addTagTypes = ['makeALists'];
const MakeAListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMakeALists: build.query({
				query: ({ page, size, searchKey }) => ({ url: GET_MAKEALISTS, params: { page, size, searchKey } }),
				providesTags: ['makeALists']
			}),
			deleteMakeALists: build.mutation({
				query: (makeAListIds) => ({
					url: DELETE_MAKEALIST_MULTIPLE,
					method: 'DELETE',
					data: { ids: makeAListIds }
				}),
				invalidatesTags: ['makeALists']
			}),
			getMakeAList: build.query({
				query: (makeAListId) => ({
					url: `${GET_MAKEALIST_BY_ID}${makeAListId}`
				}),
				providesTags: ['makeALists']
			}),
			createMakeAList: build.mutation({
				query: (newMakeAList) => ({
					url: CREATE_MAKEALIST,
					method: 'POST',
					data: jsonToFormData(MakeAListModel(newMakeAList))
				}),
				invalidatesTags: ['makeALists']
			}),
			updateMakeAList: build.mutation({
				query: (makeAList) => ({
					url: `${UPDATE_MAKEALIST}${makeAList.id}`,
					method: 'PUT',
					data: jsonToFormData(makeAList)
				}),
				invalidatesTags: ['makeALists']
			}),
			deleteMakeAList: build.mutation({
				query: (makeAListId) => ({
					url: `${DELETE_MAKEALIST}${makeAListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['makeALists']
			})
		}),
		overrideExisting: false
	});
export default MakeAListApi;
export const {
	useGetMakeAListsQuery,
	useDeleteMakeAListsMutation,
	useGetMakeAListQuery,
	useUpdateMakeAListMutation,
	useDeleteMakeAListMutation,

	useCreateMakeAListMutation
} = MakeAListApi;

export const selectFilteredMakeALists = (makeALists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return makeALists;
		}

		return FuseUtils.filterArrayByString(makeALists, searchText);
	});
