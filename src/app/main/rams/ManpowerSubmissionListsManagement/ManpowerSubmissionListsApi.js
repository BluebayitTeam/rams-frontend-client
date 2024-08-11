import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_MANPOWERLIST,
	DELETE_DEPARTMENT,
	DELETE_MANPOWERLIST,
	MANPOWERLIST_BY_PASSENGER_ID,
	MANPOWERSBLISTS_BY_DATE,
	UPDATE_MANPOWERLIST
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import ManpowerSubmissionListModel from './manpowerSubmissionList/models/ManpowerSubmissionListModel';

export const addTagTypes = ['manpowerSubmissionLists'];
const ManpowerSubmissionListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getManpowerSubmissionLists: build.query({
				query: ({ manPowerDate }) => ({
					url: MANPOWERSBLISTS_BY_DATE,
					params: { manPowerDate }
				}),
				providesTags: ['manpowerSubmissionLists']
			}),
			deleteManpowerSubmissionLists: build.mutation({
				query: (manpowerSubmissionListIds) => ({
					url: DELETE_MANPOWERLIST,
					method: 'DELETE',
					data: { ids: manpowerSubmissionListIds }
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			}),
			getManpowerSubmissionList: build.query({
				query: (manpowerSubmissionListId) => ({
					url: `${MANPOWERLIST_BY_PASSENGER_ID}${manpowerSubmissionListId}`
				}),
				providesTags: ['manpowerSubmissionLists']
			}),
			createManpowerSubmissionList: build.mutation({
				query: (newManpowerSubmissionList) => ({
					url: CREATE_MANPOWERLIST,
					method: 'POST',
					data: jsonToFormData(ManpowerSubmissionListModel(newManpowerSubmissionList))
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			}),
			updateManpowerSubmissionList: build.mutation({
				query: (manpowerSubmissionList) => ({
					url: `${UPDATE_MANPOWERLIST}${manpowerSubmissionList.id}`,
					method: 'PUT',
					data: jsonToFormData(manpowerSubmissionList)
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			}),
			deleteManpowerSubmissionList: build.mutation({
				query: (manpowerSubmissionListId) => ({
					url: `${DELETE_DEPARTMENT}${manpowerSubmissionListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['manpowerSubmissionLists']
			})
		}),
		overrideExisting: false
	});
export default ManpowerSubmissionListApi;
export const {
	useGetManpowerSubmissionListsQuery,
	useDeleteManpowerSubmissionListsMutation,
	useGetManpowerSubmissionListQuery,
	useUpdateManpowerSubmissionListMutation,
	useDeleteManpowerSubmissionListMutation,

	useCreateManpowerSubmissionListMutation
} = ManpowerSubmissionListApi;

export const selectFilteredManpowerSubmissionLists = (manpowerSubmissionLists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return manpowerSubmissionLists;
		}

		return FuseUtils.filterArrayByString(manpowerSubmissionLists, searchText);
	});
