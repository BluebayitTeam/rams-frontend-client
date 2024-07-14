import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { CREATE_MAKEALIST_ROW, DELETE_MAKEALIST_ROW, GET_MAKEALIST_ROW_BY_LIST_ID } from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import MakeListRowModel from './makeListRow/models/MakeListRowModel';

export const addTagTypes = ['makeListRows'];
const MakeListRowApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMakeListRow: build.query({
				query: (makeListRowId) => ({
					url: `${GET_MAKEALIST_ROW_BY_LIST_ID}${makeListRowId}`
				}),
				providesTags: ['makeListRows']
			}),
			createMakeListRow: build.mutation({
				query: (newMakeListRow) => ({
					url: CREATE_MAKEALIST_ROW,
					method: 'POST',
					data: jsonToFormData(MakeListRowModel(newMakeListRow))
				}),
				invalidatesTags: ['makeListRows']
			}),

			deleteMakeListRow: build.mutation({
				query: (makeListRowId) => ({
					url: `${DELETE_MAKEALIST_ROW}${makeListRowId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['makeListRows']
			})
		}),
		overrideExisting: false
	});
export default MakeListRowApi;
export const {
	useGetMakeListRowsQuery,
	useDeleteMakeListRowsMutation,
	useGetMakeListRowQuery,
	useUpdateMakeListRowMutation,
	useDeleteMakeListRowMutation,

	useCreateMakeListRowMutation
} = MakeListRowApi;

export const selectFilteredMakeListRows = (makeListRows) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return makeListRows;
		}

		return FuseUtils.filterArrayByString(makeListRows, searchText);
	});
