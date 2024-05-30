import { apiService as api } from 'app/store/apiService';
import { createSelector } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import {
	CREATE_VISACANCELLIST,
	UPDATE_VISACANCELLIST,
	DELETE_VISACANCELLIST,
	VISACANCELLIST_BY_PASSENGER_ID
} from 'src/app/constant/constants';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import { selectSearchText } from './store/searchTextSlice';
import VisaCancelListModel from './visaReissueList/models/VisaCancelListModel';
// import VisaCancelListModel from './visaCancelList/models/VisaCancelListModel';

export const addTagTypes = ['visaCancelLists'];
const VisaCancelListApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getVisaCancelList: build.query({
				query: (visaCancelListId) => ({
					url: `${VISACANCELLIST_BY_PASSENGER_ID}${visaCancelListId}`
				}),
				providesTags: ['visaCancelLists']
			}),
			createVisaCancelList: build.mutation({
				query: (newVisaCancelList) => ({
					url: CREATE_VISACANCELLIST,
					method: 'POST',
					data: jsonToFormData(
						VisaCancelListModel({
							...newVisaCancelList
						})
					)
				}),
				invalidatesTags: ['visaCancelLists']
			}),
			updateVisaCancelList: build.mutation({
				query: (visaCancelList) => ({
					url: `${UPDATE_VISACANCELLIST}${visaCancelList.id}`,
					method: 'PUT',
					data: jsonToFormData({
						...visaCancelList
					})
				}),
				invalidatesTags: ['visaCancelLists']
			}),
			deleteVisaCancelList: build.mutation({
				query: (visaCancelListId) => ({
					url: `${DELETE_VISACANCELLIST}${visaCancelListId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['visaCancelLists']
			})
		}),
		overrideExisting: false
	});
export default VisaCancelListApi;
export const {
	useGetVisaCancelListsQuery,
	useDeleteVisaCancelListsMutation,
	useGetVisaCancelListQuery,
	useUpdateVisaCancelListMutation,
	useDeleteVisaCancelListMutation,
	useCreateVisaCancelListMutation
} = VisaCancelListApi;

export const selectFilteredVisaCancelLists = (visaCancelLists) =>
	createSelector([selectSearchText], (searchText) => {
		if (searchText?.length === 0) {
			return visaCancelLists;
		}

		return FuseUtils.filterArrayByString(visaCancelLists, searchText);
	});
